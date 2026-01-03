import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MoviesApiService} from '../common/services/api/movies-api-service';
import {catchError, finalize, map, Observable, of, shareReplay, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Movie} from '../common/models/movie';
import {ScorePill} from '../common/components/score-pill/score-pill';
import {MoviePageSkeleton} from './movie-page-skeleton/movie-page-skeleton';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ScorePill,
    MoviePageSkeleton
  ],
  templateUrl: './movie-page.html',
  styleUrl: './movie-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviePage {
  isFetching = true;

  movie$: Observable<Movie | null>;

  constructor(private readonly movieApiService: MoviesApiService, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.movie$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      tap(() => {
        this.isFetching = true;
      }),
      switchMap(id =>
        this.movieApiService.getMovie(id).pipe(
          catchError(() => {
            this.router.navigate(['not-found']);
            return of(null);
          }),
          finalize(() => {
            this.isFetching = false;
          })
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
