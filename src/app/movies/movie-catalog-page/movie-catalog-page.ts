import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {MoviesApiService} from '../data-access/movies-api-service';
import {catchError, Observable, of} from 'rxjs';
import {Movie} from '../../common/shared/models/movie';
import {AsyncPipe} from '@angular/common';
import {MoviesList} from '../components/movies-list/movies-list';
import {SearchInput} from '../../common/shared/ui/search-input/search-input';

@Component({
  selector: 'app-movie-catalog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MoviesList,
    SearchInput
  ],
  templateUrl: './movie-catalog-page.html',
  styleUrl: './movie-catalog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCatalogPage {
  private movieService = inject(MoviesApiService);
  movies$: Observable<Movie[]> = this.movieService.getMovies('').pipe(
    catchError(() => of([]))
  );

  getMovies(search: string) {
    console.log(search);
    this.movies$ = this.movieService.getMovies(search).pipe(
      catchError(() => of([]))
    );
  }
}
