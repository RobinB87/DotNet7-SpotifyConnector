using api.Core.Configuration;
using api.Core.Extensions;
using api.Dtos;
using api.Services;
using domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

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
    public async Task<ActionResult<Library?>> Get()
    {
        return await _apiService.GetWithBearerToken<Library>(
            this.CreateRequestMessageWithBearerToken(HttpMethod.Get, _apiConfig.PlaylistUri));
    }

    [HttpGet("{id}/tracks")]
    public async Task<ActionResult<PlaylistTracks?>> GetTracksByPlaylistId(string id)
    {
        return await _apiService.GetWithBearerToken<PlaylistTracks>(
            this.CreateRequestMessageWithBearerToken(HttpMethod.Get, $"{_apiConfig.TracksByPlaylistId}/{id}/tracks"));
    }
}