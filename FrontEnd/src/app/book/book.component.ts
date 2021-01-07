import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BookModel } from '../books/books.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  title = 'libraryapp';

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
  book: BookModel | undefined;

  constructor(
    private booksService: BooksService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.readBook(id);
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  readBook(id: any) {
    if (id) {
      this.booksService.getBook(id).subscribe(data => {
        this.book = JSON.parse(JSON.stringify(data));
      });
    }
  }

}
