export interface PlaylistOverview {
  items: Playlist[];
  total: number;
}

export interface Playlist {
  name: string;
  tracks: Track[];
}

export interface Track {
  total: number;
}
