import { Component, OnInit } from '@angular/core';
import { Book } from '../book'
import { BookService } from '../book.service'
import { Router } from '@angular/router';
import { BookFilter } from '../book-filter';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  items: any[];
  isAscending: boolean = true;

  filter = new BookFilter();
  book: Book;
  books: any[];
  enteredId: number;
  currentPage: number = 1;
  pageSize: number = 4;

  // displayedColumns: string[] = ['id', 'bookTitle', 'authorName', 'publicationYear'];
  // dataSource = new MatTableDataSource<Book>();


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    this.getBooks();
    // this.search();
  }

  private getBooks(){
    this.bookService.getBooksList().subscribe(data => {
      this.books = data;
    });
  }

  sortTable(field: string) {
    this.books.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (this.isAscending) {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    this.isAscending = !this.isAscending;
  }

  // In your component class
paginatedBooks(): any[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.books.slice(startIndex, endIndex);
}



previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage() {
  const maxPage = Math.ceil(this.books.length / this.pageSize);
  if (this.currentPage < maxPage) {
    this.currentPage++;
  }
}


   bookDetails(id: number){
     this.router.navigate(['book-details', id]);
   }

   searchById() {
    if (this.enteredId) {
      this.bookService.getBookById(this.enteredId).subscribe(
        result => {
          this.book = result;
          console.log('Book found:', result);
        },
        error => {
          console.error('Error fetching book:', error);
          // this.book = null; // Reset book on error
        }
      );
    }
  }

  updateBook(id: number){
    this.router.navigate(['update-book', id]);
    console.log('hello');
  }

  deleteBook(id: number)
  {
    this.bookService.deleteBook(id).subscribe( data =>{
      console.log(data);
      this.getBooks();
    })
  }


  
}