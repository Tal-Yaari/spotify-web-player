import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Album,
  Playlist,
  Track,
  Tracks,
  TracksArr,
} from '../../interfaces/interfaces';
import { ApiService } from '../../services/api-service.service';
import { PlaylistServiceService } from '../categories/category/playlist/playlist-service.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  playlistData: Album[] = [];
  playlistDataTracks;
  durationMs = 0;
  durationHr;
  displayedColumns: string[] = ['number', 'title', 'duration'];
  dataSource;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private playlistServiceService: PlaylistServiceService
  ) {}

  ngOnInit(): void {
    this.apiService
      .get(`/albums/${this.route.snapshot.params.albumId}`)
      .then((res: Album[]) => {
        this.playlistData = res;
        console.log(res);

        this.apiService
          .get(`/albums/${this.route.snapshot.params.albumId}/tracks`)
          .then((res: Tracks) => {
            this.playlistDataTracks = res.items;
            this.playlistDataTracks.forEach((item: any) => {
              this.durationMs += item.duration_ms;
              item.duration_Time = this.playlistServiceService.convertMsToHours(
                false,
                item.duration_ms
              );
            });
            this.durationHr = this.playlistServiceService.convertMsToHours(
              true,
              this.durationMs
            );
            console.log(this.playlistDataTracks);
          });
      });
  }

  likeTrack(tracksId) {
    // this.apiService.put(`/me/tracks?ids=${tracksId}`).then((res: any) => {
    //   console.log(res);
    // });
  }

  likeTracks(tracksId) {
    // this.apiService
    //   .post(`/playlists/${tracksId}/tracks`, {})
    //   .then((res: any) => {
    //     console.log(res);
    //   });
  }
}
