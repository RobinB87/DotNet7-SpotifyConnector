import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TrackOverview } from "./track-overview.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private apiUrl = "https://localhost:44381/api/search";

  constructor(private http: HttpClient) {}

  // Search track
  getTrack(artist: string, song: string): Observable<TrackOverview> {
    return this.http.get<TrackOverview>(`${this.apiUrl}/${artist}/${song}`);
  }
}
