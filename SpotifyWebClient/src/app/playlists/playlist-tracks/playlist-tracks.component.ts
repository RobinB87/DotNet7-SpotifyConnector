import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaylistsService } from '../shared/playlists.service';
import { PlaylistTracksOverview } from '../shared/playlist-tracks.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.css']
})
export class PlaylistTracksComponent implements OnInit, OnDestroy {
  private playlistTracksOverview: PlaylistTracksOverview;
  private playlistId: string;
  private sub: Subscription;

  constructor(private playlistsService: PlaylistsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Get playlist Id via route (params is url parameter)
    this.sub = this.route.params.subscribe(params => {
      this.playlistId = params['uri'].replace('spotify:playlist:', '');

      this.playlistsService.getTracksForPlaylist(this.playlistId).subscribe(playlistTracksOverview => {
        this.playlistTracksOverview = playlistTracksOverview;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
