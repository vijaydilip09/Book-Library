import { Component, OnInit } from '@angular/core';
import { Book } from '../book'
import { BookService } from '../book.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  items: any[];
  isAscending: boolean = true;

  book: Book;
  books: any[];
  enteredId: any;
  // enteredAuthor: string;
  // enteredBookName: string;

  currentPage: number = 1;
  pageSize: number = 4;

  searchTerm: string = '';
searchTitle: boolean = false;
searchAuthor: boolean = false;
searchName: boolean = false;
invalidSearchCriteria: boolean = false;
  
searchCriteria: string = 'title';

  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    this.getBooks();
    // this.search();
  }

  private getBooks() {
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

  bookDetails(id: number) {
    this.router.navigate(['book-details', id]);
  }

  
  // ...
  
  search() {
    console.log('enteredId',this.enteredId);
    switch (this.searchCriteria) {
      case 'id':
        this.searchById();
        break;
      case 'author':
        this.searchByAuthor();
        break;
      case 'name':
        // Add the method for searching by name
        this.searchByTitle();
        break;
      default:
        this.invalidSearchCriteria = true;
        console.error('Invalid search criteria');
        break;
    }
  }
  

    searchById() {
   if (this.enteredId) {
     this.bookService.searchBookById(this.enteredId).subscribe(
        result => {
           this.book = result;
          this.invalidSearchCriteria = false;
            console.log('Book found:', result);
         },

    
        
         error => {
          this.invalidSearchCriteria = true;
           console.error('Error fetching book:', error);
           // this.book = null; // Reset book on error
         }
       );
     }
   }

   searchByAuthor() {
    if (this.enteredId) {
      this.bookService.searchBooksByAuthor(this.enteredId).subscribe(
        result => {
          if (Array.isArray(result) && result.length > 0) {
            // this.book = result[0];
            const numberOfElementsToCapture = 5; // Change this to your desired number
            this.books = result.slice(0, numberOfElementsToCapture);
            this.invalidSearchCriteria = false;
            console.log('Books found:', this.books);            
          } 
        },  
        error => {
          this.invalidSearchCriteria = true;
          console.error('Error fetching books by author:', error);
        }
      );
    }
  }

  searchByTitle() {
    if (this.enteredId) {
       this.bookService.searchBooksByTitle(this.enteredId).subscribe(
        result => {
          if (Array.isArray(result) && result.length > 0) {
            // this.book = result[0];
            const numberOfElementsToCapture = 5; // Change this to your desired number
            this.books = result.slice(0, numberOfElementsToCapture);
            this.invalidSearchCriteria = false;
            console.log('Books found:', this.books);
            console.log('Book found:', this.book);
          } 
        },    
         error => {
          this.invalidSearchCriteria = true;
           console.error('Error fetching books by title:', error);
         }
       );
     } 
   }


  updateBook(id: number) {
    this.router.navigate(['update-book', id]);
    console.log('hello');
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(data => {
      console.log(data);
      this.getBooks();
    })
  }


}