import { ScrollingModule } from '@angular/cdk/scrolling';

//import {A11yModule} from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import {


  MatInputModule,

  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatRippleModule,
  MatSelectModule,
  MatCheckboxModule,
  
  MatSnackBarModule,
  MatCheckboxChange,


} from '@angular/material';

@NgModule({
  exports: [
    // A11yModule,
    MatButtonModule,
    

    MatStepperModule,
    MatIconModule,
    MatInputModule,

    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    MatRippleModule,
    MatSelectModule,
    MatCheckboxModule,

    MatSnackBarModule,


    ScrollingModule,
  ]
  /*
  declarations: [],
  imports: [
    CommonModule
  ]
  */
})
export class MaterialModule { }

