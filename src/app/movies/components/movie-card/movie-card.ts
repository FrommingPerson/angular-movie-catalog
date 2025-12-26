import {ChangeDetectionStrategy, Input, Component} from '@angular/core';
import {Movie} from '../../../common/shared/models/movie';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MovieCard {
  @Input({required: true}) movie!: Movie;
}
