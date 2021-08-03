import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateCompanyComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }