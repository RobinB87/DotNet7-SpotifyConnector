import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./auth/shared/auth-service";
import { PlaylistTracksComponent } from "./playlists/playlist-tracks/playlist-tracks.component";
import { PlaylistsAddSongsComponent } from "./playlists/playlists-add-songs/playlists-add-songs.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { PlaylistsService } from "./playlists/shared/playlists.service";
import { SearchTrackComponent } from "./search/search-track/search-track.component";
import { SearchService } from "./search/shared/search.service";

@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    AuthComponent,
    PlaylistsAddSongsComponent,
    SearchTrackComponent,
    PlaylistTracksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, PlaylistsService, SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
