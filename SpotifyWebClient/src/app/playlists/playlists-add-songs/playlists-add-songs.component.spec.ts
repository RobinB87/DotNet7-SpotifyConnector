import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsAddSongsComponent } from './playlists-add-songs.component';

describe('PlaylistsAddSongsComponent', () => {
  let component: PlaylistsAddSongsComponent;
  let fixture: ComponentFixture<PlaylistsAddSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsAddSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsAddSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
