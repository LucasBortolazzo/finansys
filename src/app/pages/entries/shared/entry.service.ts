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

    super('api/entries', injector, Entry.fromJson)

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
}
