import {Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { IEvent } from 'src/app/shared/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  events: IEvent[] | undefined;
  
  constructor(private companyService: CompanyService) {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = undefined;
    this.companyService.getEvents().subscribe(events => {
      console.log(events);
      this.events = events});
  }
}
