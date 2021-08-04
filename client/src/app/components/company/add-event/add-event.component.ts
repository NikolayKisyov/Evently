import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createEvent(form: NgForm) {
    console.log(form.value);

    if (form.invalid) {
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    console.log(userId);
    
    const data = {
      name: form.value.name,
      date: form.value.date,
      time: form.value.time,
      location: form.value.location,
      description: form.value.description,
      _id: userId
    };

    this.companyService.createEvent(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
