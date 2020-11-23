import { Component, OnInit } from "@angular/core";
import { AuthService } from "./shared/auth-service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getSpotifyLoginUri().subscribe((spotifyLogin) => {
      window.open(spotifyLogin, "_blank");
    });
  }
}
