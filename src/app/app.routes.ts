import { Routes } from '@angular/router';
import {NotFoundPage} from './pages/not-found-page/not-found-page';
import {MovieCatalogPage} from './pages/movie-catalog-page/movie-catalog-page';
import {MoviePage} from './pages/movie-page/movie-page';

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
