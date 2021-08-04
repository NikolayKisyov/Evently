import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { AddEventComponent } from './add-event/add-event.component';



@NgModule({
  declarations: [
    CreateCompanyComponent,
    AddEventComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    CompanyRoutingModule
  ],
  providers:[
    CompanyService
  ]
})
export class CompanyModule { }
