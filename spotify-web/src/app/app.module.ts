import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { CategoryComponent } from './core/components/categories/category/category.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PlaylistComponent } from './core/components/categories/category/playlist/playlist.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { SvgComponent } from './core/shared/svg/svg.component';
import { SearchComponent } from './core/components/search/search.component';
import { AlbumsComponent } from './core/components/albums/albums.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, CategoriesComponent, CategoryComponent, HeaderComponent, PlaylistComponent, SvgComponent, SearchComponent, AlbumsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatTableModule, MatIconModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
