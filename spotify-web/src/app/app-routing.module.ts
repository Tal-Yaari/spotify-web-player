import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './core/components/categories/categories.component';
import { CategoryComponent } from './core/components/categories/category/category.component';
import { PlaylistComponent } from './core/components/categories/category/playlist/playlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent,},
  { path: 'category/:categoryId', component: CategoryComponent},
  { path: 'playlist/:playlistId', component: PlaylistComponent},
  // {path: 'search', component: CategoriesComponent},
  // {path: "yourLibrary", component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
