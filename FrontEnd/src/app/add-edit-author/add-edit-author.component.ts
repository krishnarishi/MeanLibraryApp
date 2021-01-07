import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-add-edit-author',
  templateUrl: './add-edit-author.component.html',
  styleUrls: ['./add-edit-author.component.css']
})
export class AddEditAuthorComponent implements OnInit {
  submitted = false;
  title = 'libraryapp';
  addEditForm!: FormGroup;
  isEdit = false;
  operation = 'add';
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

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private authorsService: AuthorsService
  ) {
  }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.operation = 'edit';
      this.readAuthor(id);
    } else {
      this.operation = 'add';
      this.isEdit = false;
    }
  }

  // tslint:disable-next-line:typedef
  readAuthor(id: any) {
    if (id) {
      this.authorsService.getAuthor(id).subscribe((data: any) => {
        this.addEditForm.setValue({
           // tslint:disable-next-line:no-string-literal
          name: data['name'],
          // tslint:disable-next-line:no-string-literal
          genre: data['genre'],
          // tslint:disable-next-line:no-string-literal
          image: data['image']
        });
        this.isEdit = false;
      });
    }
  }

  // tslint:disable-next-line:typedef
  get myForm() {
    return this.addEditForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    if (this.addEditForm && this.addEditForm.valid) {
      this.authorsService.addEditAuthor(this.addEditForm.value).subscribe(
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
