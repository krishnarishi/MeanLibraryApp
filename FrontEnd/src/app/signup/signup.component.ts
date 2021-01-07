import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  title = 'libraryapp';
  signupForm!: FormGroup;
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
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  get myForm() {
    return this.signupForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    if (this.signupForm && this.signupForm.valid) {
      this.loginService.signup(this.signupForm.value).subscribe(
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
