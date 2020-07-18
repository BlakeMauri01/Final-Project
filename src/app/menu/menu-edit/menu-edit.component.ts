import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from '../menu.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {

  originalMenu: Menu;
  menu: Menu;
  editMode: boolean = false;
  id: string;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalMenu = this.menuService.getMenu(this.id)

          if (!this.originalMenu) {
            return;
          }

          this.editMode = true;
          this.menu = JSON.parse(JSON.stringify(this.originalMenu));
        });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newMenu = new Menu(
      '',
      value.name,
      value.description,
      value.url,
      null
    );

    if (this.editMode) {
      this.menuService.updateMenu(this.originalMenu, newMenu);
    } else {
      this.menuService.addMenu(newMenu);
    }

    this.router.navigate(['/menu']);
  }

  onCancel() {
    this.router.navigate(['/menu']);
  }
}
