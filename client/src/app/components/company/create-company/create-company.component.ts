import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async create(form: NgForm) {
    console.log(form.value);

    if (form.invalid) {
      return;
    }

    const data = {
      name: form.value.name,
      address: form.value.address,
      description: form.value.description,
    };

    // this.userService.register(data).subscribe({
    //   next: () => {
    //     form.reset();
    //     this.showSignIn(this.container!);
    //     //this.router.navigate(['/']);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }

}
