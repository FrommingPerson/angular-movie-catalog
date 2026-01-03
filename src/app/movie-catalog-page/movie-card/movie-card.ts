import {ChangeDetectionStrategy, Input, Component, ChangeDetectorRef} from '@angular/core';
import {Movie} from '../../common/models/movie';
import {RouterLink} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  imports: [
    RouterLink
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MovieCard {
  @Input({required: true}) movie!: Readonly<Movie>;

  isHover = false;
  showTrailer = false;

  private hoverTimer: number | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  onEnter() {
    this.isHover = true;

    if (this.movie.trailerYoutubeId) {
      this.hoverTimer = window.setTimeout(() => {
        if (this.isHover) {
          this.showTrailer = true;
          this.cdr.markForCheck();
        }
      }, 300);
    }

    this.cdr.markForCheck();
  }

  onLeave() {
    this.isHover = false;
    this.showTrailer = false;

    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }

    this.cdr.markForCheck();
  }

  get trailerSrc(): SafeResourceUrl | null {
    if (!this.showTrailer || !this.movie.trailerYoutubeId) return null;

    const id = this.movie.trailerYoutubeId;
    const url =
      `https://www.youtube.com/embed/${id}` +
      `?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1` +
      `&loop=1&playlist=${id}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
