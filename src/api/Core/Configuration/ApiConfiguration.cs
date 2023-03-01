namespace api.Core.Configuration;
public class ApiConfiguration
{
    public const string AppSettingsName = "Api";

    public string BaseUri { get; set; } = string.Empty;
    public string PlaylistUri { get; set; } = string.Empty;
    public string SearchUri { get; set; } = string.Empty;
    public string TracksByPlaylistId { get; set; } = string.Empty;
    public string TrackUriBase { get; set; } = string.Empty;
}