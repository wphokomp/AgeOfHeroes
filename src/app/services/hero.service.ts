import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './../hero';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'http://localhost:3000/heroes/';
  constructor(private http: HttpClient) { }

  private log(message: string) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Heroes successfully fetched')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    console.log(url);
    return this.http.get<Hero>(url);
  }

  createHero(hero: Hero): Observable<any> {
    console.log(hero);
    // this.http.post(this.heroesUrl, hero, httpOptions);
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError('createHero', undefined))
      );
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}${id}`;
    return this.http.delete(url)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError('deleteHero', undefined))
      );
  }
}
