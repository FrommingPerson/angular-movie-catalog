import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap, tap
} from 'rxjs';
import {Movie} from '../common/models/movie';
import {MoviesApiService} from '../common/services/api/movies-api-service';
import {AsyncPipe} from '@angular/common';
import {MoviesList} from './movies-list/movies-list';
import {SearchInput} from '../common/components/search-input/search-input';
import {Loader} from '../common/components/loader/loader';
import {ErrorState} from '../common/components/error-state/error-state';

@Component({
  selector: 'app-movie-catalog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MoviesList,
    SearchInput,
    Loader,
    ErrorState
  ],
  templateUrl: './movie-catalog-page.html',
  styleUrl: './movie-catalog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCatalogPage {
  private search$ = new Subject<string>();
  isFetching = true;

  constructor(private readonly movieService: MoviesApiService, private readonly ref: ChangeDetectorRef) {}


  movies$: Observable<Movie[]> = this.search$.pipe(
    startWith(''),
    debounceTime(500),
    tap(() => {
      this.isFetching = true;
    }),
    distinctUntilChanged(),
    switchMap(search =>
      this.movieService.getMovies(search).pipe(
        catchError(() => of([])),
        )
      ),
    tap(() => this.isFetching = false),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  onSearch(search: string) {
    this.search$.next(search);
  }
}
