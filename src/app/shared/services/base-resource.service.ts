import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(protected apiPath: string, public injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(value => value as T)
        );
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.handleError),
            map(value => value as T)
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            map(() => resource)
        );
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }

    //PROTECTED 

    protected jsonDataToResource(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(element as T))
        return resources;
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO ->", error);
        return throwError(error);
    }
}