import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, TracksArr } from 'src/app/core/interfaces/interfaces';
import { ApiService } from 'src/app/core/services/api-service.service';
import { PlaylistServiceService } from './playlist-service.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private playlistServiceService: PlaylistServiceService
  ) {}
  playlistData: Playlist;
  playlistDataTracks: TracksArr[];
  durationMs = 0;
  durationHr;
  displayedColumns: string[] = [
    'number',
    'title',
    'album',
    'dateAdded',
    'duration',
  ];
  dataSource;

  ngOnInit(): void {
    this.apiService
      .get(`/playlists/${this.route.snapshot.params.playlistId}`)
      .then((res: Playlist) => {
        this.playlistData = res;
        this.playlistDataTracks = this.playlistData.tracks.items;
        console.log(res);
        console.log(this.playlistDataTracks);

        this.playlistDataTracks.forEach((item: TracksArr) => {
          item.track.duration_Time = this.playlistServiceService.convertMsToHours(
            false,
            item.track.duration_ms
          );
          item.addedAt = this.playlistServiceService.getDateAdded(item.added_at);
          this.durationMs += item.track.duration_ms;
        });
        this.durationHr = this.playlistServiceService.convertMsToHours(true, this.durationMs);
      });
  }

  likeTracks(tracksId) {
    // this.apiService
    // .put(`/me/albums?ids=${tracksId}`)
    // .then((res: any) => {
    //   console.log(res);
    // });
  }

  
}
