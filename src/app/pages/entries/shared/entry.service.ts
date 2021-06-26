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
    return this.setEntryAndSendServer(entry, super.create);
  }

  update(entry: Entry): Observable<Entry> {
    return this.setEntryAndSendServer(entry, super.update);
  }

  setEntryAndSendServer(entry: Entry, serverFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(categoria => {
        entry.category = categoria;

        return serverFn(entry)
      }),
      catchError(this.handleError)
      
    )    
  }
}
