import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignComponent } from './sign/sign.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    SignComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
