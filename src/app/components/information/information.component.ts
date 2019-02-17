import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  fundData: Array<object>;

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data: Array<object>) => {
      this.fundData = data.slice(0, 3);
    });
  }

  open(information) {
    this.modalService.open(information, { centered: true, size: 'lg' });
  }

}
