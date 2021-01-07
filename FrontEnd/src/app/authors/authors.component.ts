import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorModel } from './authors.model';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  title = 'libraryapp';
  authors: AuthorModel[] | undefined;
  homeNav = [
    {
        link: '/books', name: 'Books'
    },
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/books/add', name: 'Add Book'
    },
    {
        link: '/authors/add', name: 'Add Author'
    }
];

  constructor(private authorsService: AuthorsService) {
    this.readAuthors();
   }

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  readAuthors(){
    this.authorsService.getAuthors().subscribe((data: any) => {
      this.authors = JSON.parse(JSON.stringify(data));
    });
  }
  // tslint:disable-next-line:typedef
  removeAuthor(author: AuthorModel, index: number) {
    if (author._id && this.authors && this.authors.length > 0) {
      if (window.confirm('Are you sure?')) {
        this.authorsService.removeAuthor(author._id)
          .subscribe((data: any) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.authors!.splice(index, 1);
          });
      }
    }
  }
}
