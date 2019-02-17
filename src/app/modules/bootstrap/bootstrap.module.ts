import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDatepickerModule
  ],
  exports: [
    NgbDatepickerModule
  ]
})
export class BootstrapModule { }
