import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../shared/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackOverview } from '../shared/track-overview.model';

@Component({
  selector: 'app-search-track',
  templateUrl: './search-track.component.html',
  styleUrls: ['./search-track.component.css']
})
export class SearchTrackComponent implements OnInit {
  trackOverview: TrackOverview;
  public tracksForm: FormGroup;
  private sub: Subscription;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // define form (with empty default values)
    this.tracksForm = this.formBuilder.group({
      tracks: ['']
    });
  }

  async getTrackUri(artist: string, track: string): Promise<void> {
    await this.searchService.getTrack(artist, track).subscribe(trackOverview => (this.trackOverview = trackOverview));
  }

  async processPostAndCreateBatches() {
    const form = this.tracksForm.value;
    const tracks = form.tracks.trim().split(',');

    console.log(tracks.length);

    for (let trackTemp of tracks) {
      var artistAndTrack = trackTemp.split(' - ');
      var artist = artistAndTrack[0];
      var track = artistAndTrack[1];

      await this.getTrackUri(artist, track);
      await this.sleep(2000);
    }

    console.log('Process finished');
    // this.router.navigateByUrl('/playlists');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
