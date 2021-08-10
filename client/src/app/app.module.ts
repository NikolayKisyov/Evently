import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FoodCardComponent } from './components/card/food-card.component';
import { FormsModule } from '@angular/forms';
import { UserModule } from './components/user/user.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CompanyModule } from './components/company/company.module';
import { EditEventComponent } from './components/company/edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodCardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CompanyModule,
    FormsModule,
    UserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }