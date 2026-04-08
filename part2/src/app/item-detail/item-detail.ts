import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  standalone: false,
  template: `
    <div *ngIf="item">
      <h2>Item Detail</h2>
      <p>ID: {{ item.id }}</p>
      <p>Name: {{ item.name }}</p>
      <p>Description: {{ item.description }}</p>
      <p>Completed: {{ item.completed ? 'Yes' : 'No' }}</p>
    </div>
    <br>
    <a routerLink="/list">Back to List</a>
  `
})
export class ItemDetail {
  item?: Item;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemService.getItemById(id);
  }
}