import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  serverError = false;
  container: HTMLElement | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async register(form: NgForm) {
    console.log(form.value);

    if (form.invalid) {
      return;
    }

    const data = {
      username: form.value.username,
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
    };

    this.userService.register(data).subscribe({
      next: () => {
        form.reset();
        this.showSignIn(this.container!);
        //this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    })

    // await fetch(`http://localhost:5000/auth/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .catch((error) => console.log(error));

    // console.log('client', result);
    // console.log(result);
  }

  async login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form);

    const data = {
      username: form.value.username,
      password: form.value.password,
    };

    this.userService.login(data).subscribe({
      next: () => {
        //const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/';
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.serverError = true;
      }
    });

  }

  showSignUp(container: HTMLElement): void {
    if(this.container == null){
      this.container = container;
    }
    container.classList.add('right-panel-active');
  }
  showSignIn(container: HTMLElement): void {
    if(this.container == null){
      this.container = container;
    }
    container.classList.remove('right-panel-active');
  }
}
