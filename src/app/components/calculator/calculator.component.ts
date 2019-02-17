import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { Chart } from 'angular-highcharts';
import { Finance } from 'financejs';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

export class DataPoint {
  'scheme_name': string;
  'nav': number;
  'timestamp': {
    '$date': Date
  };
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class CalculatorComponent implements OnInit {

  schemeName: string;
  amount: number;
  startDate: Date;
  endDate: Date;


  finance: Finance;
  tableData;
  fundData: Array<DataPoint>;
  chart: Chart;

  absoluteReturns = 0;
  cagr = 0;
  xirr = 0;

  isSIP = false;
  netInvestment = 0;
  returns = 0;
  period = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.finance = new Finance();
    this.http.get('assets/data.json').subscribe((data: Array<DataPoint>) => {
      this.fundData = data;
      this.schemeName = data[0].scheme_name;
    });
  }

  calculateSIP() {
    this.isSIP = true;
    let netInvestment = 0;

    const resultData = [];
    const nbMonths = moment(this.endDate).diff(moment(this.startDate), 'months', false);

    let units = 0;
    for (let i = 0; i < nbMonths; i++) {
      const tempStartDate = new Date(moment(this.startDate).add(i, 'months').format());
      const tempEndDate = new Date(moment(this.startDate).add(i + 1, 'months').format());

      netInvestment += this.amount;

      this.filterDataOnDateRange(tempStartDate, tempEndDate).then((data: Array<DataPoint>) => {
        units += (this.amount / Number(data[0].nav));
        resultData.push(...this.processDataForChart(data, units));


        this.displayChart(resultData);
        this.calculateInvestmentVsReturns(netInvestment, this.peek(resultData)[1]);
      });
    }
  }

  calculateLumpsum() {
    this.isSIP = false;
    let resultData: Array<Array<any>> = null;

    this.filterDataOnDateRange(this.startDate, this.endDate).then((data: Array<DataPoint>) => {
      const units = this.amount / Number(data[0].nav);
      resultData = this.processDataForChart(data, units);

      this.displayChart(resultData);
      this.calculateInvestmentVsReturns(this.amount, this.peek(resultData)[1]);
    });
  }

  quickDateSelect(n: number) {
    switch (n) {
      case 1:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(1, 'month').format());
        break;
      case 3:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(3, 'months').format());
        break;
      case 6:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(6, 'months').format());
        break;
      case 12:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(1, 'year').format());
        break;
      case 36:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(3, 'years').format());
        break;
      case 60:
        this.endDate = new Date();
        this.startDate = new Date(moment().subtract(5, 'years').format());
        break;
      default: break;
    }
  }

  filterDataOnDateRange(startDate: Date, endDate: Date = new Date()): Promise<Array<DataPoint>> {
    return new Promise((resolve) => {
      const data = this.fundData.filter((x: DataPoint) => {
        const timestamp = new Date(x.timestamp.$date);
        return timestamp >= startDate && timestamp <= endDate;
      });

      resolve(data);
    });
  }

  processDataForChart(arr: Array<DataPoint>, units: number): Array<Array<any>> {
    return arr.map((x) => {
      const date = new Date(x.timestamp.$date).getTime();
      const val = x.nav * units;
      return [date, val, units, x.nav];
    });
  }

  displayChart(resultData: Array<any>) {
    this.generateTableData(resultData);

    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    this.chart = new Chart({
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      title: {
        text: 'Investment Tracker'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Investment Value'
        }
      },
      exporting: {
        enabled: true
      },
      tooltip: {
        formatter() {
          return 'Investment Value: <b>₹' + Highcharts.numberFormat(this.y, 2, '.', ',') + '</b><br/>' +
            'as of <b>' + moment(this.x).fromNow() + '</b>';
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: this.schemeName,
          type: 'line',
          data: resultData
        }
      ],
    });
  }

  generateTableData(resultData: Array<Array<any>>) {
    this.calculateAbsReturns(resultData[0][3], this.peek(resultData)[3]);
    this.calculateCAGR(resultData);
    this.calculateXIRR(resultData);

    this.tableData = resultData.map((d) => {
      return [
        new Date(d[0]),
        d[1],
        d[2],
        d[3]
      ];
    });
  }

  calculateAbsReturns(initialNAV, currentNAV) {
    this.absoluteReturns = (currentNAV - initialNAV) / initialNAV;
  }

  calculateCAGR(data) {
    const nbMonths = moment(this.endDate).diff(moment(this.startDate), 'months', false);
    this.cagr = this.finance.CAGR(this.netInvestment, this.peek(data)[1], nbMonths);
  }

  calculateXIRR(data) {
    const cashflow = data.map((d) => {
      return (d[1] - this.amount);
    });
    try {
      this.xirr = this.finance.IRR(data[0][1] - this.amount, ...cashflow);
    } catch (error) {
      this.xirr = 0;
    }
  }

  calculateInvestmentVsReturns(netInvestment, netWorth) {
    this.netInvestment = netInvestment;
    this.period = moment(this.endDate).diff(moment(this.startDate), 'months', false);
    this.returns = netWorth - netInvestment;
  }

  peek(array) {
    return array[array.length - 1];
  }

}
