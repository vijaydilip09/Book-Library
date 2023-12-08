import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AppRoutingModule } from 'app.routes';
import { BookListComponent } from '../book-list/book-list.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { AppComponent } from '../app.component';



@NgModule({
  declarations: [
    // AppComponent,
    // BookListComponent,
    // CreateBookComponent,
    // UpdateBookComponent
  ],
  imports: [
    CommonModule,
    // AppComponent,
    
  ],

})
export class AppModule { }
