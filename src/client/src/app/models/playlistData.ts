export interface PlaylistData {
  playlists: Playlist[];
  total: number;
}

export interface Playlist {
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
