using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class PlaylistTracksOverview
    {
        public List<PlaylistTracks> items { get; set; }
        public int total { get; set; }
    }

    public class PlaylistTracks
    {
        public DateTime added_at { get; set; }
        public bool is_local { get; set; }
        public PlaylistTrackOverviewTrack track { get; set; }
    }

    public class PlaylistTrackOverviewArtist
    {
        public string name { get; set; }
        public string type { get; set; }
        public string uri { get; set; }
    }

    public class PlaylistTrackOverviewAlbum
    {
        public string album_type { get; set; }
        public List<PlaylistTrackOverviewArtist> artists { get; set; }
        public string name { get; set; }
        public string release_date { get; set; }
        public int total_tracks { get; set; }
        public string type { get; set; }
        public string uri { get; set; }
    }

    public class PlaylistTrackOverviewTrack
    {
        public PlaylistTrackOverviewAlbum album { get; set; }
        public int duration_ms { get; set; }
        public string name { get; set; }
        public bool track { get; set; }
        public int track_number { get; set; }
        public string type { get; set; }
        public string uri { get; set; }
    }
}
