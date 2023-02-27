using Newtonsoft.Json;

namespace domain;
public class AccessToken
{
    [JsonProperty("access_token")]
    public string Token { get; set; } = string.Empty;

    [JsonProperty("token_type")]
    public string Type { get; set; } = string.Empty;

    [JsonProperty("expires_in")]
    public long ExpiresIn { get; set; }

    [JsonProperty("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;

    [JsonProperty("scope")]
    public string Scope { get; set; } = string.Empty;

    public DateTimeOffset? ValidUntil { get; set; }
}