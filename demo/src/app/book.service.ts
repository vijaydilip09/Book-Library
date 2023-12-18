import { Injectable } from '@angular/core';

import { Book } from './book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  searchBooksByAuthor(author: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseURL}/author/${author}`);
  }

  searchBooksByTitle(bookTitle: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseURL}/Title/${bookTitle}`);
  }

}


