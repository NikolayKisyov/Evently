import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  // setUpSignUp(signUpButton: HTMLElement, container: HTMLElement) {
  //   signUpButton.addEventListener('click', showSignUp(container){
  //     container.classList.add('right-panel-active');
  //   });
  // }

  async register(form: NgForm) {
    console.log(form.value);

    if (form.invalid) { return; }

    const data = {
      username: form.value.username,
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
    };

    const result = await fetch(`http://localhost:5000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
 
    
    console.log('client', result);
    console.log(result);
  }

  async login(form: NgForm) {
    if (form.invalid) { return; }

    const data = {username: form.value.username, password:form.value.password};
    
    const result = await fetch(`http://localhost:5000/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
        console.log(result);
  }

  showSignUp(container: HTMLElement): void {
    container.classList.add('right-panel-active');
  }
  showSignIn(container: HTMLElement): void {
    container.classList.remove('right-panel-active');
  }

  // setUpSignIn(signInButton: HTMLElement, container: HTMLElement) {
  //   signInButton.addEventListener('click', () => {
  //     container.classList.remove('right-panel-active');
  //   });
  // }

  // const signUpButton = document.getElementById('signUp');
  // const signInButton = document.getElementById('signIn');
  // const container = document.getElementById('container');
}
