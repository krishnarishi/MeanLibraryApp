import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUri = 'http://localhost:5000/books';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getBooks() {
    return this.http.get(`${this.baseUri}`, {headers: this.headers});
  }

  getBook(id: string): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers});
  }

  removeBook(id: string): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
