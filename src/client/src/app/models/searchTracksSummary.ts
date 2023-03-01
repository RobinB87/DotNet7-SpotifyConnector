import { Track } from "./playlistTracks";

export interface SearchTracksSummary {
  tracks: Track[];
  total: number;
}
