import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  private apiUrl = "https://localhost:44381/api/auth";

  constructor(private http: HttpClient) {}

  // Get spotifylogin uri
  getSpotifyLoginUri() {
    return this.http.get(`${this.apiUrl}`, { responseType: "text" });
  }
}
