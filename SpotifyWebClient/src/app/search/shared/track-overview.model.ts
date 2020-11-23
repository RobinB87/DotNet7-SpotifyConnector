export interface TrackOverview {
  tracks: TracksFromOverview;
}

export interface TracksFromOverview {
  items: ItemsFromTracks[];
}

export interface ItemsFromTracks {
  album: Album;
  uri: string;
}

export interface Artist {
  name: string;
  uri: string;
}

export interface Album {
  artists: Artist[];
  name: string;
  uri: string;
}
