using api.Core.Configuration;
using api.Core.Extensions;
using api.Dtos;
using api.Services;
using domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly ApiConfiguration _apiConfig;
    private readonly ApiService _apiService;

    public PlaylistController(IOptions<ApiConfiguration> apiConfig, ApiService apiService)
    {
        _apiConfig = apiConfig.Value ?? throw new ArgumentNullException(nameof(apiConfig));
        _apiService = apiService ?? throw new ArgumentNullException(nameof(apiService));
    }

    [HttpGet]
    public async Task<ActionResult<Library?>> Get() =>
        await _apiService.SendWithBearerToken<Library>(
            this.CreateRequestMessageWithBearerToken(HttpMethod.Get, 
            _apiConfig.PlaylistUri));

    [HttpGet("{id}/tracks")]
    public async Task<ActionResult<PlaylistTracks?>> GetTracksByPlaylistId(string id) =>
        await _apiService.SendWithBearerToken<PlaylistTracks>(
            this.CreateRequestMessageWithBearerToken(HttpMethod.Get, 
            $"{_apiConfig.TracksByPlaylistId}/{id}/tracks"));

    [HttpPost("add")]
    public async Task AddTracksToPlaylist(AddTracksRequest req) =>
        await _apiService.SendWithBearerToken<object>(
            this.CreateRequestMessageWithBearerToken(HttpMethod.Post,
            $"{_apiConfig.TracksByPlaylistId}/{req.PlaylistId}/tracks",
            new StringContent(req.CreateUriArrayString(), Encoding.UTF8, "application/json")));
}