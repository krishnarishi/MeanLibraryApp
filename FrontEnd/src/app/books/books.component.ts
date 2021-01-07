import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel} from './books.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title = 'libraryapp';
  books: BookModel[] | undefined;
  homeNav = [
    {
        link: 'books', name: 'Books'
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

  constructor(private booksService: BooksService) {
    this.readBooks();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  readBooks() {
    this.booksService.getBooks().subscribe((data: any) => {
      this.books = JSON.parse(JSON.stringify(data));
    });
  }

  // tslint:disable-next-line:typedef
  removeBook(book: BookModel, index: number) {
    if (book._id && this.books && this.books.length > 0) {
      if (window.confirm('Are you sure?')) {
        this.booksService.removeBook(book._id)
          .subscribe((data: any) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.books!.splice(index, 1);
          });
      }
    }
  }

}

