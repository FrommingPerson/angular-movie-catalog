import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MovieCard} from '../movie-card/movie-card';
import {Movie} from '../../../common/shared/models/movie';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    MovieCard,
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesList {
  @Input({required: true}) movies!: Movie[];
}
