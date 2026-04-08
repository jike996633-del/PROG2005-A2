import { Component } from '@angular/core';
import { ItemService } from '../item';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  standalone: false,
  template: `
    <h2>Item List</h2>
    <ul>
      <li *ngFor="let item of items">
        {{ item.name }} - {{ item.description }}
        <a [routerLink]="['/detail', item.id]">View</a>
      </li>
    </ul>
    <br>
    <a routerLink="/">Back to Home</a>
  `
})
export class ItemList {
  items: Item[] = [];

  constructor(private itemService: ItemService) {
    this.items = this.itemService.getItems();
  }
}