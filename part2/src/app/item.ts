import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items: Item[] = [
    { id: 1, name: "学习Angular", description: "完成作业", completed: false },
    { id: 2, name: "学习TypeScript", description: "练习接口", completed: true }
  ];

  getItems(): Item[] {
    return this.items;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find(i => i.id === id);
  }

  addItem(item: Item): void {
    item.id = Date.now();
    this.items.push(item);
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(i => i.id !== id);
  }
}