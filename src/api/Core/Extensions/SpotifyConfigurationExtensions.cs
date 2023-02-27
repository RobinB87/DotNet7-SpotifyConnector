using api.Core.Configuration;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace api.Core.Extensions;
internal static class SpotifyConfigurationExtensions
{
    internal static Uri GetAuthorizationCodeUri(this AuthConfiguration config)
    {
        var authParams = new Dictionary<string, string?> {
            { "client_id", config.ClientId },
            { "response_type", config.ResponseType },
            { "redirect_uri", config.RedirectUri },
            { "scope", config.Scope }};

        return new Uri(QueryHelpers.AddQueryString(
            $"{config.BaseUri}/{config.AuthorizeUri}", authParams));
    }

    internal static HttpRequestMessage GetAccessTokenRequestMessage(this AuthConfiguration config, string authorizationCode)
    {
        var content = new Dictionary<string, string>
        {
            { "code", authorizationCode},
            { "redirect_uri", config.RedirectUri},
            { "grant_type", config.GrantType }
        };

        return new HttpRequestMessage(HttpMethod.Post, $"{config.BaseUri}/{config.TokenRequestUri}")
        {
            Content = new FormUrlEncodedContent(content)
        };
    }
}