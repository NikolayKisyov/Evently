import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { ICompany } from 'src/app/shared/interfaces/company';
import { IEvent } from 'src/app/shared/interfaces/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  event: IEvent | undefined;
  company: ICompany | undefined;
  isOwner: boolean | undefined;
  currentAttendees: number | undefined;
  willAttend: boolean | undefined;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fetchEvent();
  }

  fetchEvent(): void {
    this.event = undefined;
    const id = this.activatedRoute.snapshot.params.eventId;
    this.companyService.getEvent(id).subscribe((event) => {
      this.setDateProperties(event);
      this.currentAttendees = event.attendees.length;
      
      this.fetchCompany(event.companyId.toString());
      this.event = event;
      this.willAttend = this.isGoing;
    });
  }

  fetchCompany(id: string): void {
    this.company = undefined;
    this.companyService.getCompany(id).subscribe((company) => {
      this.checkIfOwner(company);
      this.company = company;
    });
  }

  setDateProperties(event: IEvent) {
    let newDate = new Date(event.date);
    event.dateMonth = newDate.toLocaleString('default', { month: 'short' });
    event.dateDay = newDate.getDate();
    event.dateYear = newDate.getFullYear();
  }

  attendEvent(eventId: string) {
    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    const data = { userId };
    this.companyService.attendEvent(eventId, data).subscribe({
      next: (res) => {
        this.willAttend = !this.willAttend;
        this.onAttendChange();
        //this.router.navigate(['/event-details', eventId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkIfOwner(company: ICompany) {
    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    company.ownerId._id == userId
      ? (this.isOwner = true)
      : (this.isOwner = false);
  }

  get isGoing(): boolean {
    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    let res = this.event!.attendees.includes(userId) ? true : false;

    return res;
  }

  onAttendChange() {
    if (this.willAttend) {
      this.currentAttendees! += 1;
    } else {
      this.currentAttendees! -= 1;
    }
  }
}
