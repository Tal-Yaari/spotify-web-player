import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, TracksArr } from 'src/app/core/interfaces/interfaces';
import { ApiService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  playlistData: Playlist;
  playlistDataTracks: TracksArr[];
  durationMs = 0;
  durationHr;
  displayedColumns: string[] = ['number', 'title', 'album', 'duration'];
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
          item.track.duration_Time = this.convertMsToHours(false,item.track.duration_ms);
          this.durationMs += item.track.duration_ms;
        });
        this.convertMsToHours(true,this.durationMs);
      });
  }

  convertMsToHours(totalTime: boolean,durationMs) {
    let h, m, s;
    h = Math.floor(durationMs / 1000 / 60 / 60);
    m = Math.floor((durationMs / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((durationMs/1000/60/60 - h)*60 - m)*60);
    if(totalTime) {
      this.durationHr = `${h} hr ${m} min`
    } else {
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
  }
}
