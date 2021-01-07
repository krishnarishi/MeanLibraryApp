import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted = false;
  title = 'libraryapp';
  signinForm!: FormGroup;
  indexNav = [
    {
        link : '/signin', name : 'SignIn'
    },
    {
        link : '/signup', name : 'SignUp'
    }
  ];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private loginService: LoginService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  mainForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  get myForm() {
    return this.signinForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log('---> ', this.signinForm);
    this.submitted = true;
    if (this.signinForm && this.signinForm.valid) {
      this.loginService.signin(this.signinForm.value).subscribe(
        () => {
          this.ngZone.run(() => this.router.navigateByUrl('/books'));
        }, (error) => {
          console.log(error);
        });
      return true;
    } else {
      return false;
    }
  }
}
