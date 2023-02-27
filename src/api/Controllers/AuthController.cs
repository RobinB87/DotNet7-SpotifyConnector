using api.Core.Configuration;
using api.Core.Extensions;
using domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly SpotifyConfiguration _spotifyConfiguration;

    public AuthController(
        IOptions<SpotifyConfiguration> spotifyConfiguration)
    {
        _spotifyConfiguration = spotifyConfiguration.Value
            ?? throw new ArgumentNullException(nameof(spotifyConfiguration));
    }

    [HttpGet("login")]
    public async Task<ActionResult<string?>> GetSpotifyLoginUri()
    {
        var client = new HttpClient();
        var response = await client.GetAsync(_spotifyConfiguration.GetAuthorizationCodeUri());
        return response.IsSuccessStatusCode 
            ? response.RequestMessage?.RequestUri?.ToString()
            : response.StatusCode.ToString();
    }

    [HttpGet("token/{code}")]
    public async Task<ActionResult<AccessToken>> GetAccessTokenFromSpotify(string code)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue($"Basic", Convert.ToBase64String(
                Encoding.ASCII.GetBytes(
                    $"{_spotifyConfiguration.ClientId}:{_spotifyConfiguration.ClientSecret}")));

        var response = await client.SendAsync(_spotifyConfiguration.GetAccessTokenRequestMessage(code));
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            return Ok(JsonConvert.DeserializeObject<AccessToken>(content));
        }

        return Unauthorized();
    }
}