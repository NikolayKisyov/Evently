import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async create(form: NgForm) {
    console.log(form.value);

    if (form.invalid) {
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    console.log(userId);
    
    const data = {
      name: form.value.name,
      address: form.value.address,
      description: form.value.description,
      _id: userId
    };

    this.companyService.create(data).subscribe({
      next: () => {
        form.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
