# Mutual Fund Investment Calculator

This is one of the most complex projects/problems I have worked on, yet. It involved a lot of math, and a lot of logical thinking, but finally, it was achieved.

In it's simplest form, it is a mutual fund investment calculator which allows you to **track your SIP (monthly) and Lumpsum investments** and using **real historical NAV data from AMFI**, to track the performance of the fund over time.

## Demo

You can check out the live demo of the application over here:
### https://mf-investment-calculator.herokuapp.com/

## Screenshot

<img src="https://i.imgur.com/6JtvzIo.png" alt="Screenshot of Mutual Fund Investment Calculator" width="300px" />
<img src="https://i.imgur.com/XPNkxGK.png" alt="Screenshot of Mutual Fund Investment Calculator" width="300px" />

## About the Data

This calculator uses a sample dataset from AMFI of the mutual fund **Aditya Birla Sun Life Tax Relief '96 - Growth Regular Option** as the entire mutual fund NAV history dataset is rather large (>4 GB) on a NoSQL database.

This is a sample excerpt of how the data looks:

```json
[
  {
    "_id": {
      "$oid": "5c66aed8fad58f0907a176d1"
    },
    "amc_code": 3,
    "amc_name": "Aditya Birla Sun Life Mutual Fund",
    "scheme_code": 107745,
    "scheme_name": "Aditya Birla Sun Life Tax Relief '96 - Growth Option",
    "isin": "INF209K01108",
    "nav": 9.88,
    "timestamp": {
      "$date": "2008-03-10T00:00:00.000Z"
    }
  },
  {
    "_id": {
      "$oid": "5c66aed8fad58f0907a176d2"
    },
    "amc_code": 3,
    "amc_name": "Aditya Birla Sun Life Mutual Fund",
    "scheme_code": 107745,
    "scheme_name": "Aditya Birla Sun Life Tax Relief '96 - Growth Option",
    "isin": "INF209K01108",
    "nav": 10.12,
    "timestamp": {
      "$date": "2008-03-11T00:00:00.000Z"
    }
  },
  {
    "_id": {
      "$oid": "5c66aed8fad58f0907a176d3"
    },
    "amc_code": 3,
    "amc_name": "Aditya Birla Sun Life Mutual Fund",
    "scheme_code": 107745,
    "scheme_name": "Aditya Birla Sun Life Tax Relief '96 - Growth Option",
    "isin": "INF209K01108",
    "nav": 10.13,
    "timestamp": {
      "$date": "2008-03-12T00:00:00.000Z"
    }
  }
]
```

## Credits

* [Angular v7.2.0](https://angular.io/)
* [Bootstrap v4.3](https://getbootstrap.com/)
* [ng-bootstrap](https://ng-bootstrap.github.io/#/home)
* [Highcharts](https://www.highcharts.com/)
* [Finance.js](http://financejs.org/)
* [Moment.js](https://momentjs.com/)
