export interface Library {
  playlists: Playlist[];
  total: number;
}

export interface Playlist {
  id: string;
  name: string;
  type: string;
  uri: string;
  owner: Owner;
  tracks: Tracks;
}

export interface Owner {
  name: string;
  type: string;
  uri: string;
}

export interface Tracks {
  total: number;
}
