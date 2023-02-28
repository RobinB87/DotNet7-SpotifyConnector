using Newtonsoft.Json;

namespace api.Dtos;
public class PlaylistTracks
{
    [JsonProperty("items")]
    public List<TrackSummary> TrackSummaries { get; set; } = new List<TrackSummary>();

    [JsonProperty("total")]
    public int Total { get; set; }
}

public class TrackSummary
{
    [JsonProperty("track")]
    public Track? Track { get; set; }
}

public class Track
{
    [JsonProperty("album")]
    public Album? Album { get; set; }

    [JsonProperty("artists")]
    public List<Artist> Artists { get; set; } = new List<Artist>();

    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;

    [JsonProperty("popularity")]
    public int Popularity { get; set; }
}

public class Album
{
    [JsonProperty("artists")]
    public List<Artist> Artists { get; set; } = new List<Artist>();

    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;
}

public class Artist
{
    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;
}

public class Image
{
    [JsonProperty("height")]
    public int Height { get; set; }

    [JsonProperty("width")]
    public int Width { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; } = string.Empty;
}