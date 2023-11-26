import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<T, U> {
  public static readonly API_URL = 'https://pokeapi.co/api/v2/pokemon?&limit=151';
  private http = inject(HttpClient);

  private dataSubject = new BehaviorSubject<T | null>(null);
  private data$: Observable<T | null> = this.dataSubject.asObservable();

  private itemSubject = new BehaviorSubject<U | null>(null);
  private item$: Observable<U | null> = this.itemSubject.asObservable();

  fetchData(queryParams?: { [param: string]: string | number }): Observable<T> {
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        params = params.append(key, queryParams[key].toString());
      });
    }
    return this.http.get<T>(DataService.API_URL, { params }).pipe(
      tap(data => this.dataSubject.next(data))
    );
  }

  fetchItemDetails(url: string): Observable<U> {
    return this.http.get<U>(url).pipe(
      tap(data => this.itemSubject.next(data))
    );
  }

  getData(): Observable<T | null> {
    return this.data$;
  }

  getItemData(): Observable<U | null> {
    return this.item$;
  }
}
