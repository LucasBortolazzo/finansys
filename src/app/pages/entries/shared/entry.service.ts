import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, pipe, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { Entry } from "./entry.model"

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entryes";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(value => value as Entry)
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(value => value as Entry)
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );    
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entryes: Entry[] = [];
    jsonData.forEach(element => entryes.push(element as Entry))
    return entryes;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO ->", error);
    return throwError(error);
  }
}