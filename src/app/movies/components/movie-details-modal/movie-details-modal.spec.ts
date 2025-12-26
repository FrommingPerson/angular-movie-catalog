import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsModal } from './movie-details-modal';

describe('MovieDetailsModal', () => {
  let component: MovieDetailsModal;
  let fixture: ComponentFixture<MovieDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
