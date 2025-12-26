import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [
    FormsModule
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  @Output() searchChanged = new EventEmitter<string>();
  protected search: string = "";

  @ViewChild('searchInput') input!: ElementRef<HTMLInputElement>;
  @HostListener('window:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent) {
    const element = this.input?.nativeElement;
    if (!element) return;

    if (document.activeElement === element) {
      return;
    }

    const active = document.activeElement as HTMLElement | null;
    const tag = active?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || active?.isContentEditable) return;

    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key.length !== 1) return;

    element.focus();
  }

  onInputChange(value: string) {
    this.search = value;
    this.searchChanged.emit(value);
  }

  clearSearch() {
    if (this.search === "") {
      return;
    }
    this.search = '';
    this.searchChanged.emit('');
  }
}
