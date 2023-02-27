using api.Services;
using domain;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService ?? throw new ArgumentNullException(nameof(authService));
    }

    [HttpGet("login")]
    public async Task<ActionResult<string?>> GetSpotifyLoginUri() => await _authService.GetSpotifyLoginUri();

    [HttpGet("token/{code}")]
    public async Task<ActionResult<AccessToken?>> GetAccessTokenFromSpotify(string code) =>
        await _authService.GetAccessTokenFromSpotify(code);
}