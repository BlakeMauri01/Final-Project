import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';

import { IcecreamComponent } from './icecream/icecream.component';
import { IcecreamEditComponent } from './icecream/icecream-edit/icecream-edit.component';
import { IcecreamDetailComponent } from './icecream/icecream-detail/icecream-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    {
        path: 'menu', component: MenuComponent, children:
            [
                { path: 'new', component: MenuEditComponent },
                { path: ':id', component: MenuDetailComponent },
                { path: ':id/edit', component: MenuEditComponent }
            ]
    },
    {
        path: 'icecream', component: IcecreamComponent, children:
            [
                { path: 'new', component: IcecreamEditComponent },
                { path: ':id', component: IcecreamDetailComponent },
                { path: ':id/edit', component: IcecreamEditComponent },
            ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }