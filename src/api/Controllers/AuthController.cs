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
    private readonly AuthConfiguration _authConfig;

    public AuthController(
        IOptions<AuthConfiguration> spotifyConfiguration)
    {
        _authConfig = spotifyConfiguration.Value
            ?? throw new ArgumentNullException(nameof(spotifyConfiguration));
    }

    [HttpGet("login")]
    public async Task<ActionResult<string?>> GetSpotifyLoginUri()
    {
        var client = new HttpClient();
        var response = await client.GetAsync(_authConfig.GetAuthorizationCodeUri());
        return response.IsSuccessStatusCode
            ? response.RequestMessage?.RequestUri?.ToString()
            : response.StatusCode.ToString();
    }

    [HttpGet("token/{code}")]
    public async Task<ActionResult<AccessToken?>> GetAccessTokenFromSpotify(string code)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue($"Basic", Convert.ToBase64String(
                Encoding.ASCII.GetBytes(
                    $"{_authConfig.ClientId}:{_authConfig.ClientSecret}")));

        var response = await client.SendAsync(_authConfig.GetAccessTokenRequestMessage(code));
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<AccessToken>(content);

            if (token == null)
                return BadRequest();

            token.ValidUntil = DateTime.UtcNow + TimeSpan.FromSeconds(token.ExpiresIn);
            return token;
        }

        return Unauthorized();
    }
}