import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MoviesApiService} from '../../movies/data-access/movies-api-service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';
import {Movie} from '../../common/shared/models/movie';
import {AsyncPipe} from '@angular/common';
import {MoviesList} from '../../movies/components/movies-list/movies-list';
import {SearchInput} from '../../common/shared/ui/search-input/search-input';
import {Loader} from '../../common/shared/ui/loader/loader';
import {ErrorState} from '../../common/shared/ui/error-state/error-state';

type Vm =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'data'; movies: Movie[] };

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
  private movieService = inject(MoviesApiService);

  private search$ = new Subject<string>();

  vm$: Observable<Vm> = this.search$.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(search =>
      this.movieService.getMovies(search).pipe(
        map(movies => ({ state: 'data', movies }) as Vm),
        catchError(() =>
          of({ state: 'error', message: 'Failed to load movies' } as Vm)
        )
      )
    ),
    startWith({ state: 'loading' } as Vm),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  onSearch(search: string) {
    this.search$.next(search);
  }
}
