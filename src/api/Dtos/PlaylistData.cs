using Newtonsoft.Json;

namespace domain;

public class PlaylistData
{
    [JsonProperty("items")]
    public List<Playlist> Playlists { get; set; } = new List<Playlist>();

    [JsonProperty("total")]
    public int Total { get; set; }
}

public class Playlist
{
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