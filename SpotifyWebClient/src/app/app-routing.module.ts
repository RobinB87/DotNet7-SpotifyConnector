import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { PlaylistTracksComponent } from "./playlists/playlist-tracks/playlist-tracks.component";
import { PlaylistsAddSongsComponent } from "./playlists/playlists-add-songs/playlists-add-songs.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { SearchTrackComponent } from "./search/search-track/search-track.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "playlists", component: PlaylistsComponent },
  { path: "playlists-add/:uri", component: PlaylistsAddSongsComponent },
  { path: "playlists-tracks/:uri", component: PlaylistTracksComponent },
  { path: "search", component: SearchTrackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
