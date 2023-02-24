namespace api.Core.Configuration;
public class SpotifyConfiguration
{
    public const string AppSettingsName = "Spotify";

    public string BaseUri { get; set; } = string.Empty;
    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string ResponseType { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
    public string Scopes { get; set; } = string.Empty;
    public string TokenRequestUri { get; set; } = string.Empty;
}