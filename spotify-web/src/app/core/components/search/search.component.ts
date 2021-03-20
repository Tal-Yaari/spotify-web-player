import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Subscription } from 'rxjs';
import { FilterTypes, Track } from '../../interfaces/interfaces';
import { PlaylistServiceService } from '../categories/category/playlist/playlist-service.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  resultList: FilterTypes;
  subscription = new Subscription();
  url: string = '';
  type: string = null;

  constructor(
    private playlistServiceService: PlaylistServiceService,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.getSearchItems();
    this.subscription = this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd && this.router.url != '/search/') {
        this.getSearchItems();
      }
    });
  }

  getSearchItems() {
    this.type = this.route.snapshot.params.type;
    this.url = this.route.snapshot.params.type
      ? `/search?q=${this.route.snapshot.params.text}&type=${this.route.snapshot.params.type}`
      : `/search?q=${this.route.snapshot.params.text}&type=album,track,playlist&limit=6`;
    this.getFunc(this.url);
  }

  getFunc(url) {
    this.apiService.get(url).then((res: any) => {
      this.resultList = res;
      console.log(this.resultList);

      if (this.route.snapshot.params.type == 'tracks') {
        this.resultList.tracks.items.forEach((item: Track) => {
          item.duration_Time = this.playlistServiceService.convertMsToHours(
            false,
            item.duration_ms
          );
        });
      }
    });
  }

  goToAlbum(albumId) {
    this.router.navigateByUrl(`/albums/${albumId}`);
  }

  goToPlaylist(playlistId) {
    this.router.navigateByUrl(`/playlist/${playlistId}`);
  }

  searchFor(type) {
    this.url = `/search?q=${this.route.snapshot.params.text}&type=${type}`;
    this.router.navigateByUrl(
      `/search/${this.route.snapshot.params.text}/${type}`
    );
    this.getFunc(this.url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
