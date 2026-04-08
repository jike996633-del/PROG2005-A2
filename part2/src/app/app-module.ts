import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { ItemAdd } from './item-add/item-add';
import { ItemList } from './item-list/item-list';
import { ItemDetail } from './item-detail/item-detail';

@NgModule({
  declarations: [App, Home, ItemAdd, ItemList, ItemDetail],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
