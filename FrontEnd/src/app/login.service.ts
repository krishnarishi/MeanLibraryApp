import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUri = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  signin(signinFormData: any) {
    return this.http.post(`${this.baseUri}/signin`, signinFormData);
  }

  // tslint:disable-next-line:typedef
  signup(signupFormData: any) {
    return this.http.post(`${this.baseUri}/signup`, signupFormData);
  }
}
