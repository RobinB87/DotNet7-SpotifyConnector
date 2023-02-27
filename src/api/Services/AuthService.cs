using api.Core.Configuration;
using api.Core.Extensions;
using domain;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace api.Services;
public class AuthService
{
    private readonly HttpClient _client;
    private readonly AuthConfiguration _authConfig;

    public AuthService(HttpClient client, IOptions<AuthConfiguration> authConfig)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
        _authConfig = authConfig.Value ?? throw new ArgumentNullException(nameof(authConfig));
    }

    public async Task<string?> GetSpotifyLoginUri()
    {
        var response = await _client.GetAsync(_authConfig.GetAuthorizationCodeUri());

        return response.IsSuccessStatusCode
            ? response.RequestMessage?.RequestUri?.ToString()
            : response.StatusCode.ToString();
    }

    public async Task<AccessToken?> GetAccessTokenFromSpotify(string code)
    {
        _client.DefaultRequestHeaders.Authorization = GetBasicAuthHeaderValue();
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        var response = await _client.SendAsync(_authConfig.GetAccessTokenRequestMessage(code));
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<AccessToken>(content);

            if (token == null) return null;

            token.ValidUntil = DateTime.UtcNow + TimeSpan.FromSeconds(token.ExpiresIn);
            return token;
        }

        return null;
    }

    private AuthenticationHeaderValue GetBasicAuthHeaderValue() =>
        new AuthenticationHeaderValue($"Basic", Convert.ToBase64String(
                Encoding.ASCII.GetBytes($"{_authConfig.ClientId}:{_authConfig.ClientSecret}")));
}