using api.Core.Configuration;
using Microsoft.AspNetCore.WebUtilities;

namespace api.Core.Extensions;
public static class SpotifyConfigurationExtensions
{
    public static Uri GetAuthorizationCodeUri(this SpotifyConfiguration config)
    {
        var authParams = new Dictionary<string, string?> {
            { "client_id", config.ClientId },
            { "response_type", config.ResponseType },
            { "redirect_uri", config.RedirectUri },
            { "scope", config.Scope }};

        return new Uri(QueryHelpers.AddQueryString(
            $"{config.BaseUri}/{config.AuthorizeUri}", authParams));
    }
}