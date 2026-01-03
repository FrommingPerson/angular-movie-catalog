import { Routes } from '@angular/router';
import {NotFoundPage} from './not-found-page/not-found-page';
import {MovieCatalogPage} from './movie-catalog-page/movie-catalog-page';
import {MoviePage} from './movie-page/movie-page';

export const routes: Routes = [
  {
    path: '',
    component: MovieCatalogPage
  },
  {
    path: 'movies/:id',
    component: MoviePage
  },
  {
    path: '**',
    component: NotFoundPage
  },
];
