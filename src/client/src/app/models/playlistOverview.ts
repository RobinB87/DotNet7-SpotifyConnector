export interface PlaylistOverview {
  items: Item[];
  total: number;
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

export interface Item {
  primaryColor: any;
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  popularity: number;
}
