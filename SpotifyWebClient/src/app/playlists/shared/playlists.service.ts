import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlaylistTracksOverview } from "./playlist-tracks.model";
import { PlaylistOverview } from "./playlists-overview.model";
import { SongIdList } from "./song-id-list.model";

@Injectable()
export class PlaylistsService {
  // TODO: Base service with: 'https://localhost:44324/api/
  private apiUrl = "https://localhost:44381/api/playlists";

  constructor(private http: HttpClient) {}

  // Get playlists
  getPlaylists(): Observable<PlaylistOverview> {
    return this.http.get<PlaylistOverview>(`${this.apiUrl}`);
  }

  // Get tracks of one playlist
  getTracksForPlaylist(playlistId: string): Observable<PlaylistTracksOverview> {
    return this.http.get<PlaylistTracksOverview>(
      `${this.apiUrl}/${playlistId}/tracks`
    );
  }

  // Add tracks to a playlist
  addSongsToPlaylist(
    songIdListToAdd: SongIdList,
    playlistId: string
  ): Observable<SongIdList> {
    return this.http.post<SongIdList>(
      `${this.apiUrl}/${playlistId}`,
      songIdListToAdd
    );
  }
}
