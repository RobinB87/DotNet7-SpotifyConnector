export interface PlaylistTracksOverview {
  items: PlaylistTracks[];
  total: number;
}

export interface PlaylistTracks {
  added_at: Date | string;
  is_local: boolean;
  track: PlaylistTracksOverviewTrack;
}

export interface PlaylistTracksOverviewTrack {
  album: PlaylistTracksOverviewAlbum;
  duration_ms: number;
  name: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface PlaylistTracksOverviewAlbum {
  album_type: string;
  artists: PlaylistTracksOverviewArtist[];
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface PlaylistTracksOverviewArtist {
  name: string;
  type: string;
  uri: string;
}
