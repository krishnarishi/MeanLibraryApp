import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'libraryapp';
  indexNav = [
    {
        link : '/signin', name : 'SignIn'
    },
    {
        link : '/signup', name : 'SignUp'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
