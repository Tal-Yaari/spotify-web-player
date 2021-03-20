import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './core/components/albums/albums.component';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { CategoryComponent } from './core/components/categories/category/category.component';
import { PlaylistComponent } from './core/components/categories/category/playlist/playlist.component';
import { SearchComponent } from './core/components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CategoriesComponent },
  // { path: 'search/:text', component: SearchComponent },
  { path: 'search', 
  children:[
    {path: '', component: CategoriesComponent},
    {path: ':text', component: SearchComponent},
    {path: ':text/:type', component: SearchComponent},
  ] },
  { path: 'category/:categoryId', component: CategoryComponent },
  { path: 'playlist/:playlistId', component: PlaylistComponent },
  { path: 'albums/:albumId', component: AlbumsComponent },
    {path: "yourLibrary", redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
