import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbDatepickerModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbModalModule
  ],
  exports: [
    NgbDatepickerModule,
    NgbModalModule
  ]
})
export class BootstrapModule { }
