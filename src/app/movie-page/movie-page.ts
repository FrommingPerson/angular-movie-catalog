import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MoviesApiService} from '../common/services/api/movies-api-service';
import {catchError, map, of, startWith, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Loader} from '../common/components/loader/loader';
import {Movie} from '../common/models/movie';
import {ErrorState} from '../common/components/error-state/error-state';
import {ScorePill} from '../common/components/score-pill/score-pill';

type Vm =
  | { state: 'loading' }
  | { state: 'error' }
  | { state: 'data'; movie: Movie };

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [
    AsyncPipe,
    Loader,
    ErrorState,
    RouterLink,
    ScorePill
  ],
  templateUrl: './movie-page.html',
  styleUrl: './movie-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviePage {
  private route = inject(ActivatedRoute);
  private movieApiService = inject(MoviesApiService);

  vm$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id =>
      this.movieApiService.getMovie(id).pipe(
        map(movie => ({ state: 'data', movie }) as Vm),
        catchError(() => of({ state: 'error' } as Vm))
      )
    ),
    startWith({ state: 'loading' } as Vm)
  );
}
