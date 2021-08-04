import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { CreateCompanyComponent } from './create-company/create-company.component';

const routes: Routes = [
  {
    path: 'add-company',
    component: CreateCompanyComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    }
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }