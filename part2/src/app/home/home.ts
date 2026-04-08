import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <h1>Welcome to Item Manager</h1>
    <nav>
      <a routerLink="/list">Item List</a> |
      <a routerLink="/add">Add Item</a>
    </nav>
  `
})
export class Home { }