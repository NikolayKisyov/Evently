import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';

const routes: Routes = [
  {
    path: 'authenticate',
    component: SignComponent,
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }