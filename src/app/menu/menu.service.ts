import { Injectable } from '@angular/core';
import { Menu } from './menu.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    menus: Menu[];
    menuListChangedEvent = new Subject<Menu[]>();
    maxMenuId: number;

    constructor(private http: HttpClient) { }

    addMenu(newMenu: Menu) {
        if (!newMenu) {
            return;
        }

        this.maxMenuId++;

        newMenu.id = this.maxMenuId.toString();

        this.menus.push(newMenu);

        this.storeMenus();
    }

    deleteMenu(menu: Menu) {
        if (!menu) {
            return;
        }


        const pos = this.menus.indexOf(menu);

        if (pos < 0) {
            return;
        }

        this.menus.splice(pos, 1);

        this.storeMenus();
    }

    getMenu(id: string): Menu {
        for (const menu of this.menus) {
            if (menu.id === id) {
                return menu;
            }
        }

        return null;
    }

    getMenus() {
        this.http.get('https://final-project-61ccf.firebaseio.com/menus.json')
        .subscribe(
            (menus: Menu[]) => {
                this.menus = menus;

                this.maxMenuId = this.getMaxId();

                this.menus.sort((a, b) => (a.name < b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                this.menuListChangedEvent.next(this.menus.slice());
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getMaxId(): number {
        let maxId = 0;
        for (const menu of this.menus) {
            let currentId = parseInt(menu.id);

            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    storeMenus() {
        let menus =JSON.stringify(this.menus);

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put('https://final-project-61ccf.firebaseio.com/menus.json', menus, { headers: headers })
        .subscribe(
            () => {
                this.menuListChangedEvent.next(this.menus.slice());
            }
        );
    }

    updateMenu(originalMenu: Menu, newMenu: Menu) {
        if (!originalMenu || !newMenu) {
            return;
        }

        const pos = this.menus.indexOf(originalMenu);

        if (pos < 0) {
            return;
        }

        newMenu.id = originalMenu.id;

        this.menus[pos] = newMenu;
    
        const menusListClone = this.menus.slice();
        
        this.menuListChangedEvent.next(menusListClone);
    }
}