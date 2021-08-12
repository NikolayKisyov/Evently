import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivate } from 'src/app/guard/auth.activate';
import { AddEventComponent } from './add-event/add-event.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';


const routes: Routes = [
  {
    path: 'add-company',
    component: CreateCompanyComponent,
    canActivate: [LoginActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/authenticate',
    }
  },
  {
    path: 'event-details/:eventId',
    component: EventDetailsComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/authenticate',
    }
  },
  {
    path: 'add-event',
    canActivate: [LoginActivate],
    component: AddEventComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/authenticate',
    }
  },
  {
    path: 'edit-event/:eventId',
    canActivate: [LoginActivate],
    component: EditEventComponent,
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/authenticate',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }