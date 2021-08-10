import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { IEvent } from 'src/app/shared/interfaces/event';
import { environment as config } from 'src/environments/environment';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  now: any;
  event: IEvent | undefined;
  
  constructor(
    private companyService: CompanyService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}
  
  ngOnInit() {
    this.fetchEvent();
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }


  fetchEvent(): void {
    this.event = undefined;
    const id = this.activatedRoute.snapshot.params.eventId;
    this.companyService.getEvent(id).subscribe((event) => {
      console.log(event);
      this.event = event;
    });
  }
  async editEvent(form: NgForm) {
    console.log(form.value.time);

    if (form.invalid) {
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    console.log(userId);
    const id = this.activatedRoute.snapshot.params.eventId;
    const data = {
      name: form.value.name,
      date: form.value.date,
      time: form.value.time,
      location: form.value.location,
      description: form.value.description,
      userId,
    };

    console.log(userId,data);
//EDITEVENTTODO
    this.companyService.editEvent(data, id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
