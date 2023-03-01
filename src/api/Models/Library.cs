using Newtonsoft.Json;

namespace api.Models;
public class Library
{
    [JsonProperty("items")]
    public IEnumerable<PlaylistSummary> Playlists { get; set; } = new List<PlaylistSummary>();

    [JsonProperty("total")]
    public int Total { get; set; }
}

public class PlaylistSummary
{
    [JsonProperty("id")]
    public string Id { get; set; } = string.Empty;

    [JsonProperty("name")]
    public string Name { get; set; } = string.Empty;

    [JsonProperty("owner")]
    public Owner? Owner { get; set; }

    [JsonProperty("tracks")]
    public Tracks? Tracks { get; set; }

    [JsonProperty("type")]
    public string Type { get; set; } = string.Empty;
    
    [JsonProperty("uri")]
    public string Uri { get; set; } = string.Empty;
}

public class Owner
{
    [JsonProperty("display_name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonProperty("type")]
    public string Type { get; set; } = string.Empty;

    [JsonProperty("uri")]
    public string Uri { get; set; } = string.Empty;
}

public class Tracks
{
    [JsonProperty("total")]
    public int Total { get; set; }
}