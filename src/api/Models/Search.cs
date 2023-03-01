using Newtonsoft.Json;

namespace api.Models;
public class SearchTracksWrapper
{
    [JsonProperty("tracks")]
    public SearchTracksSummary? TrackSummaries { get; set; }
}

public class SearchTracksSummary
{
    [JsonProperty("items")]
    public List<Track> Tracks { get; set; } = new List<Track>();

    [JsonProperty("total")]
    public int Total { get; set; }
}