import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../authors.service';
import { AuthorModel } from '../authors/authors.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

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
author: AuthorModel | undefined;

  constructor(
    private authorsService: AuthorsService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.readAuthor(id);
   }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  readAuthor(id: any) {
    if (id) {
      this.authorsService.getAuthor(id).subscribe(data => {
        this.author = JSON.parse(JSON.stringify(data));
      });
    }
  }

}
