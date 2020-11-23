import { Component, OnInit } from '@angular/core';
import { PlaylistOverview } from './shared/playlists-overview.model';
import { PlaylistsService } from './shared/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlistOverview: PlaylistOverview;

  constructor(private playlistsService: PlaylistsService) {}

  ngOnInit() {
    this.playlistsService.getPlaylists().subscribe(playlistOverview => {
      this.playlistOverview = playlistOverview;
    });
  }
}
