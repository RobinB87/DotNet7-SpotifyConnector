export interface Library {
  playlists: PlaylistSummary[];
  total: number;
}

export interface PlaylistSummary {
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
