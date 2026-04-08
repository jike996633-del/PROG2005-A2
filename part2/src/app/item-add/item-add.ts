import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-add',
  standalone: false,
  template: `
    <h2>Add New Item</h2>
    <input #nameInput placeholder="Name" />
    <input #descInput placeholder="Description" />
    <button (click)="addItem(nameInput.value, descInput.value)">Add</button>
    <br><br>
    <a routerLink="/">Back</a>
  `
})
export class ItemAdd {
  constructor(private itemService: ItemService, private router: Router) {}

  addItem(name: string, description: string) {
    if (!name || !description) return;
    const newItem: Item = {
      id: 0,
      name,
      description,
      completed: false
    };
    this.itemService.addItem(newItem);
    this.router.navigate(['/list']);
  }
}