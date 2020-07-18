import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header.component';

import { IcecreamComponent } from './icecream/icecream.component';
import { IcecreamItemComponent } from './icecream/icecream-item/icecream-item.component';
import { IcecreamDetailComponent } from './icecream/icecream-detail/icecream-detail.component';
import { IcecreamListComponent } from './icecream/icecream-list/icecream-list.component';
import { IcecreamEditComponent } from './icecream/icecream-edit/icecream-edit.component';

import { MenuComponent } from './menu/menu.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { IcecreamsFilterPipe } from './icecream/icecream-filter.pipe';

import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IcecreamComponent,
    IcecreamItemComponent,
    IcecreamDetailComponent,
    IcecreamListComponent,
    IcecreamEditComponent,
    MenuComponent,
    MenuEditComponent,
    MenuItemComponent,
    MenuListComponent,
    MenuDetailComponent,
    IcecreamsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DndModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
