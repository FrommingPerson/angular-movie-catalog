import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
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
import {NoResultsState} from '../common/components/no-results-state/no-results-state';

@Component({
  selector: 'app-movie-catalog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MoviesList,
    SearchInput,
    Loader,
    NoResultsState
  ],
  templateUrl: './movie-catalog-page.html',
  styleUrl: './movie-catalog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCatalogPage {
  private search$ = new Subject<string>();
  isFetching = true;

  constructor(private readonly movieService: MoviesApiService) {}


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
