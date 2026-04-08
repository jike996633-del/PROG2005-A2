import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 👇 类名+路径100%匹配你所有组件的真实导出
import { Home } from './home/home';
import { ItemAdd } from './item-add/item-add';
import { ItemList } from './item-list/item-list';
import { ItemDetail } from './item-detail/item-detail';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'add', component: ItemAdd },
  { path: 'list', component: ItemList },
  { path: 'detail/:id', component: ItemDetail },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }