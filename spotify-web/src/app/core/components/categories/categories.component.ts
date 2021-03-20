import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Categories, FilterTypes, Track, TracksArr } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api-service.service';
import { HeaderService } from '../header/header.service';
import { SearchService } from '../search/search.service';
import { PlaylistServiceService } from './category/playlist/playlist-service.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: Categories;


  constructor(
    private apiService: ApiService,
    private headerService: HeaderService,
    private router: Router,
    private playlistServiceService: PlaylistServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // let headers = new HttpHeaders()
    // .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin', 'http://localhost:4200/search')
    // .set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS')
    // .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    // this.http.get(`https://accounts.spotify.com/authorize?client_id=cf6854fe87b6471e8c5dc3ac3e0dfd56&response_type=code&redirect_uri=http://localhost:4200/search`, {headers: headers}).subscribe((res: any) => {
    //   console.log(res);
    // });
    this.apiService.get('/browse/categories').then((res: any) => {
      console.log(res);
      this.categoriesList = res.categories.items;
    });
  }

}
