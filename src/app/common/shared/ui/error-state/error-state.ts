import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-state',
  imports: [],
  templateUrl: './error-state.html',
  styleUrl: './error-state.css',
})
export class ErrorState {
  @Input({required: true}) public title!: string;
  @Input({required: true}) public message!: string;
}
