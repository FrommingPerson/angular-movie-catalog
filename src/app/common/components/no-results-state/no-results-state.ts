import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-no-results-state',
  imports: [],
  templateUrl: './no-results-state.html',
  styleUrl: './no-results-state.css',
})
export class NoResultsState {
  @Input({required: true}) public title!: string;
  @Input({required: true}) public message!: string;
}
