import { Injectable } from '@angular/core';
import {Movie} from '../../models/movie';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private readonly apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getMovies(search = ''): Observable<Movie[]> {
    const s = search.trim();

    const url = s
      ? `${this.apiUrl}/movies?title_like=${encodeURIComponent(s)}`
      : `${this.apiUrl}/movies`;

    return this.http.get<Movie[]>(url);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }
}
