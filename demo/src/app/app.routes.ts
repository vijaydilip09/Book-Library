import { ExtraOptions, PreloadAllModules, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const APP_ROUTES: Routes = [
  {path : 'books', component: BookListComponent},
  {path: 'create-books', component: CreateBookComponent },
  {path: 'update-book/:id', component: UpdateBookComponent},
  {path : 'book-details/:id', component: BookDetailsComponent}
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
}



