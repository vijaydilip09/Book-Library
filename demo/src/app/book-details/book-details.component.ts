import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  id: number;
  book: Book = new Book();
  constructor( private bookService : BookService,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.bookService.getBookById(this.id).subscribe(data => {
      this.book = data;
      console.log('book',this.book);
    }, error => console.log(error));
  }

}
