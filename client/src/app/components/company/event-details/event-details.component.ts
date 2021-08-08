import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { ICompany } from 'src/app/shared/interfaces/company';
import { IEvent } from 'src/app/shared/interfaces/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  event: IEvent | undefined;
  company: ICompany | undefined;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.fetchEvent();
  }

  fetchEvent(): void {
    this.event = undefined;
    const id = this.activatedRoute.snapshot.params.eventId;
    this.companyService.getEvent(id).subscribe((event) => {
      this.setDateProperties(event);
      console.log(event);
      this.fetchCompany(event.companyId.toString());
      this.event = event;
    });
  }

  fetchCompany(id: string): void {
    this.company = undefined;
    this.companyService.getCompany(id).subscribe((company) => {
      this.company = company;
    });
  }

  setDateProperties(event: IEvent) {
    let newDate = new Date(event.date);
    event.dateMonth = newDate.toLocaleString('default', { month: 'short' });
    event.dateDay = newDate.getDate();
    event.dateYear = newDate.getFullYear();
  }
}
