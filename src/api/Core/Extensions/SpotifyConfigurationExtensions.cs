using api.Core.Configuration;
using Microsoft.AspNetCore.WebUtilities;

namespace api.Core.Extensions;
internal static class SpotifyConfigurationExtensions
{
    internal static HttpRequestMessage GetAuthorizationCodeUri(this AuthConfiguration config)
    {
        var authParams = new Dictionary<string, string?> {
            { "client_id", config.ClientId },
            { "response_type", config.ResponseType },
            { "redirect_uri", config.RedirectUri },
            { "scope", config.Scope }};

        var uri = QueryHelpers.AddQueryString(config.AuthorizeUri, authParams);
        return new HttpRequestMessage(HttpMethod.Get, uri);
    }

    internal static HttpRequestMessage GetAccessTokenRequestMessage(this AuthConfiguration config, string authorizationCode)
    {
        var content = new Dictionary<string, string>
        {
            { "code", authorizationCode},
            { "redirect_uri", config.RedirectUri},
            { "grant_type", config.GrantType }
        };

        return new HttpRequestMessage(HttpMethod.Post, config.TokenRequestUri)
        {
            Content = new FormUrlEncodedContent(content)
        };
    }
}