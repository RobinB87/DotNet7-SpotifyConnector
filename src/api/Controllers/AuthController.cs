using api.Core.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using System.Web;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    //private readonly UserManager<User> _userManager;
    private readonly SpotifyConfiguration _spotifyConfiguration;

    public AuthController(
        IOptions<SpotifyConfiguration> spotifyConfiguration)
    {
        _spotifyConfiguration = spotifyConfiguration.Value
            ?? throw new ArgumentNullException(nameof(spotifyConfiguration));
    }

    //public AuthController(UserManager<User> userManager)
    //{
    //    _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
    //}

    [HttpGet("login")]
    public async Task<ActionResult<string>> GetSpotifyLoginUri()
    {
        // Create Uri Builder
        var builder = new UriBuilder(_spotifyConfiguration.BaseUri) { Port = -1 };

        // Create the query
        var query = HttpUtility.ParseQueryString(builder.Query);
        query["client_id"] = _spotifyConfiguration.ClientId;
        query["response_type"] = _spotifyConfiguration.ResponseType;
        query["redirect_uri"] = _spotifyConfiguration.RedirectUri;
        query["scope"] = _spotifyConfiguration.Scopes;

        builder.Query = query.ToString();

        var client = new HttpClient();
        var response = await client.GetAsync(builder.ToString());
        return !response.IsSuccessStatusCode ? string.Empty : response.RequestMessage.RequestUri.ToString();
    }

    //[HttpGet("redirect")]
    //public async Task<ActionResult<AccessToken>> GetAccessTokenFromSpotify(string code)
    //{
    //    var content = $"grant_type=authorization_code&redirect_uri={_spotifyConfiguration.RedirectUri}&code={code}";

    //    var body = CreateMessageBody(content, "application/x-www-form-urlencoded",
    //        new Dictionary<string, object>
    //        {
    //                {"code", code},
    //                {"redirectUri", _spotifyConfiguration.RedirectUri},
    //        });

    //    // Content type header
    //    var request = new HttpRequestMessage(HttpMethod.Post, _spotifyConfiguration.TokenRequestUri)
    //    {
    //        Content = body
    //    };

    //    // Set basic auth to get access token
    //    var client = new HttpClient();
    //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    //    client.DefaultRequestHeaders.Authorization =
    //        new AuthenticationHeaderValue($"Basic", Convert.ToBase64String(
    //            Encoding.ASCII.GetBytes(
    //                $"{_spotifyConfiguration.ClientId}:{_spotifyConfiguration.ClientSecret}")));

    //    var response = await client.SendAsync(request);
    //    var responseContent = await response.Content.ReadAsStringAsync();
    //    return Ok(JsonConvert.DeserializeObject<AccessToken>(responseContent));
    //}

    //private static StringContent CreateMessageBody(string body, string mediaType, Dictionary<string, object> placeholders = null)
    //{
    //    if (string.IsNullOrWhiteSpace(body)) return null;
    //    if (placeholders != null)
    //    {
    //        foreach (var pair in placeholders)
    //        {
    //            body = body.Replace($"{{{{{pair.Key}}}}}", pair.Value.ToString());
    //        }
    //    }

    //    return new StringContent(body, Encoding.UTF8, mediaType);
    //}
}