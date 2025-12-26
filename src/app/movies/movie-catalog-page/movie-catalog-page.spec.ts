import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCatalogPage } from './movie-catalog-page';

describe('MovieCatalogPage', () => {
  let component: MovieCatalogPage;
  let fixture: ComponentFixture<MovieCatalogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCatalogPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCatalogPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
