import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  menu: Menu;
  id: string;
  nativeWindow: any;

  constructor(    
    private menuService: MenuService,
    private windowRefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute
) { this.nativeWindow = windowRefService.getNativeWindow();}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.menu = this.menuService.getMenu(this.id);
      }
    );
  }

  onDelete() {
    this.menuService.deleteMenu(this.menu);
    this.router.navigateByUrl('/menu');
  }

  onView() {
    if (this.menu.url) {
      this.nativeWindow.open(this.menu.url);
    }
  }
}
