import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientInMemoryWebApiModule }from "angular-in-memory-web-api"
import { InMemoryDatabase } from "../in-memory-database";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [
    // shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class CoreModule {

}
