import { Injectable } from '@angular/core';
import { BookFilter } from './book-filter';

import { Book } from './book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  BookList: Book[] = [];


  private baseURL="http://localhost:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  

  getBooksList(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.baseURL}`);
  }

  createBook(book: Book): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, book);
  }

  getBookById(id: number): Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseURL}/${id}`);
  }

  updateBook(id: number, book: Book): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, book);
  }

  deleteBook(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  searchBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseURL}/${id}`);
  }

  // load(filter: BookFilter): void {
  //   this.find(filter).subscribe(result => {
  //       this.BookList = result;
  //       console.log('Bookl',result);
  //     },
  //     err => {
  //       console.error('error loading', err);
  //     }
  //   );
  // }

  // find(filter: BookFilter): Observable<Book[]> {
  //   const url = `http://localhost:8080/api/v1/books`;
  //   const headers = new HttpHeaders().set('Accept', 'application/json');
  //   let params = new HttpParams().set('authorName', 'Raja');
  //   return this.httpClient.get<Book[]>(url, { headers, params });
  // }
}


