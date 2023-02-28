export interface PlaylistTracks {
  trackSummaries: TrackSummary[];
  total: number;
}

export interface TrackSummary {
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  popularity: number;
}

export interface Album {
  artists: Artist[];
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}
