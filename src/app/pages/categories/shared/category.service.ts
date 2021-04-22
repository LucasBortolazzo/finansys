import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { Category } from "./category.model"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  private jsonDataToCategories(jsonData: any[]): Category[]{
    const categories: Category[] = [];

    jsonData.forEach(element => categories.push(element as Category))
  }
}
