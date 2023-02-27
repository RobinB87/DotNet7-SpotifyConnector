using System.Collections.Generic;

namespace api.Core.Configuration;
public class SpotifyConfiguration
{
    public const string AppSettingsName = "Spotify";

    public string AuthorizeUri { get; set; } = string.Empty;
    public string BaseUri { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string TokenRequestUri { get; set; } = string.Empty;

    public string ClientId { get; set; } = string.Empty;
    public string ResponseType { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
    public string Scope { get; set; } = string.Empty;
}