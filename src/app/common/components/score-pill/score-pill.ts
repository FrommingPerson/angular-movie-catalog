import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

type ScoreTone = 'good' | 'normal' | 'mediocre' | 'bad' | 'no-input';

@Component({
  selector: 'app-score-pill',
  standalone: true,
  imports: [NgClass],
  templateUrl: './score-pill.html',
  styleUrl: './score-pill.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ScorePill {
  @Input({ required: true }) score!: number | null | undefined;

  get tone(): ScoreTone {
    const s = this.score;
    if (s === null || s === undefined || Number.isNaN(s)) return 'no-input';

    if (s >= 80) return 'good';
    if (s >= 60) return 'normal';
    if (s >= 40) return 'mediocre';
    return 'bad';
  }

  get label(): string {
    const s = this.score;
    return (s === null || s === undefined || Number.isNaN(s)) ? '—' : String(s);
  }
}
