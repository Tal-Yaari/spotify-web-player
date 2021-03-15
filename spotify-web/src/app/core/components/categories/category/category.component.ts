import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories, Playlist } from 'src/app/core/interfaces/interfaces';
import { ApiService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  categoryData: Categories;
  categoryPlaylist: Playlist[];

  ngOnInit(): void {
    this.apiService.get(`/browse/categories/${this.route.snapshot.params.categoryId}`).then((res: Categories) => {
      console.log(res);
      this.categoryData = res;
    });
    this.apiService.get(`/browse/categories/${this.route.snapshot.params.categoryId}/playlists?limit=8`).then((res: any) => {
      console.log(res.playlists);
      this.categoryPlaylist = res.playlists.items;
    });
    
  }

}
