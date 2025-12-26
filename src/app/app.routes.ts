import { Routes } from '@angular/router';
import {PageNotFound} from './page-not-found/page-not-found';
import {MovieCatalogPage} from './movies/movie-catalog-page/movie-catalog-page';

export const routes: Routes = [
  {
    path: '',
    component: MovieCatalogPage
  },
  {
    path: '**',
    component: PageNotFound
  },
];
