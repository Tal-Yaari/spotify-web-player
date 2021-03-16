import { Component, OnInit } from '@angular/core';
import { Categories } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api-service.service';
import { AuthTokenService } from '../../services/spotify.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesList: Categories;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get('/browse/categories').then((res:any) => {
      console.log(res);
      this.categoriesList = res.categories.items;
    });
    // this.spotifyServive.getQuery('/browse/categories').subscribe(data => {
    //   console.log(data);
    // })
  }

   getColor(index :number) : string {
    switch( index) { 
      case 0 : return "rgb(245, 155, 35)"
      case 1 : return "rgb(160, 195, 210)"
      case 2 : return "rgb(75, 145, 125)"
      case 3 : return "rgb(180, 155, 200)"
      case 4 : return "rgb(255, 100, 55)"
      case 5 : return "rgb(80, 155, 245)"
      case 6 : return "rgb(240, 55, 165)"
      default: return "rgb(235, 30, 50)"
    }
  }

}

