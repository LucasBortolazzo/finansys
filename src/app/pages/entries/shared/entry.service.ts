import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, pipe, throwError } from "rxjs"
import { map, catchError, flatMap } from "rxjs/operators"
import { Entry } from "./entry.model"
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(public injector: Injector,
    private categoryService: CategoryService) {

      super('api/entries', injector)

  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(categoria => {
        entry.category = categoria;

        return super.update(entry);
      })
    )
  }

  protected jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);

      entries.push(entry)
    })
    return entries;
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO ->", error);
    return throwError(error);
  }
}
