import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { ItemAdd } from './item-add/item-add';
import { ItemList } from './item-list/item-list';
import { ItemDetail } from './item-detail/item-detail';

@NgModule({
  declarations: [
    App,
    Home,
    ItemAdd,
    ItemList,
    ItemDetail
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }