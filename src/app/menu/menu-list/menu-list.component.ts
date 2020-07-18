import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  subscription: Subscription;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.subscription = this.menuService.menuListChangedEvent.subscribe(
      (menus: Menu[]) => {
        this.menus = menus
      }
    );

    this.menuService.getMenus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
