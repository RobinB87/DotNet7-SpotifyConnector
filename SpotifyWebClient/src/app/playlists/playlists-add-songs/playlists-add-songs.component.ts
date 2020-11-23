import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SongIdList } from '../shared/song-id-list.model';
import { PlaylistOverview } from '../shared/playlists-overview.model';
import { Subscription } from 'rxjs';
import { PlaylistsService } from '../shared/playlists.service';

@Component({
  selector: 'app-playlists-add-songs',
  templateUrl: './playlists-add-songs.component.html',
  styleUrls: ['./playlists-add-songs.component.css']
})
export class PlaylistsAddSongsComponent implements OnInit {
  @Input() playlistOverview: PlaylistOverview;

  public songsForm: FormGroup;
  public songsIdList: SongIdList;
  private playlistId: number;
  private sub: Subscription;

  constructor(
    private playlistsService: PlaylistsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // get route data (playlistId)
    this.sub = this.route.params.subscribe(params => {
      this.playlistId = params['uri'].replace('spotify:playlist:', '');
    });

    // define form (with empty default values)
    this.songsForm = this.formBuilder.group({
      playlistId: [this.playlistId],
      uris: ['']
    });
  }

  async addBatchOfSongUris(uris: string[]): Promise<void> {
    this.songsIdList = new SongIdList();
    this.songsIdList.uris = uris;

    await this.playlistsService.addSongsToPlaylist(this.songsIdList, this.songsForm.controls['playlistId'].value).subscribe();
  }

  async processPostAndCreateBatches() {
    const form = this.songsForm.value;
    const uris = form.uris.trim().split(',');
    console.log(uris.length);
    let maxNumberOfUris = 20;

    if (uris.length > maxNumberOfUris) {
      let batchOfUris: string[] = [];
      let urisToDo = uris.length;
      let currentUri = 0;

      for (let y = 0; y <= urisToDo; y++) {
        if (urisToDo < maxNumberOfUris) {
          maxNumberOfUris = urisToDo;
        }
        for (let i = 0; i < maxNumberOfUris; i++) {
          batchOfUris.push(uris[currentUri]);
          urisToDo -= 1;
          currentUri += 1;
        }
        await this.addBatchOfSongUris(batchOfUris);
        batchOfUris = [];
      }
    } else {
      await this.addBatchOfSongUris(uris);
    }

    console.log('Process finished');
    this.router.navigateByUrl('/playlists');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
