using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Repository.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/playlists")]
    public class PlaylistsController : Controller
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IAccessTokenRepository _accessTokenRepository;
        private readonly IAuthService _authService;

        private readonly string _playlistUriBase;
        private readonly string _playlistUri;

        public PlaylistsController(ILogger<PlaylistsController> logger, IMapper mapper, 
            IAccessTokenRepository accessTokenRepository, IAuthService authService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _accessTokenRepository = accessTokenRepository ?? throw new ArgumentNullException(nameof(accessTokenRepository));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));

            _playlistUriBase = ConfigurationManager.AppSettings["PlaylistUriBase"];
            _playlistUri = ConfigurationManager.AppSettings["PlaylistUri"];
        }

        [HttpGet]
        public async Task<ActionResult> GetPlaylistsAsync()
        {
            var tokenEntity = await _accessTokenRepository.GetAccessToken();
            tokenEntity = _accessTokenRepository.ValidateToken(tokenEntity);
            if (string.IsNullOrEmpty(tokenEntity.Token))
            {
                return Unauthorized();
            }

            // Set bearer auth
            var client = _authService.GetClientWithBearerAuth(tokenEntity);
            var response = await client.GetAsync($"{_playlistUriBase}{_playlistUri}");
            var playlistsString = await response.Content.ReadAsStringAsync();
            return Ok(JsonConvert.DeserializeObject<PlaylistOverview>(playlistsString));
        }

        [HttpGet("{playlistId}/tracks")]
        public async Task<ActionResult> GetPlaylistTracksAsync(string playlistId)
        {
            var tokenEntity = await _accessTokenRepository.GetAccessToken();
            tokenEntity = _accessTokenRepository.ValidateToken(tokenEntity);
            if (string.IsNullOrEmpty(tokenEntity.Token))
            {
                return Unauthorized();
            }

            // Evt meegeven als parameter: ?offset=50&limit=100"  (dus offset - begin en limit = 100) 
            // zodat ik door alle tracks kan loopen van een playlist.
            var playlistsUri = $"playlists/{playlistId}/tracks";

            // Set bearer auth
            var client = _authService.GetClientWithBearerAuth(tokenEntity);
            var response = await client.GetAsync($"{_playlistUriBase}{playlistsUri}");
            var playlistsString = await response.Content.ReadAsStringAsync();
            return Ok(JsonConvert.DeserializeObject<PlaylistTracksOverview>(playlistsString));
        }

        [HttpPost("{playlistId}")]
        public async Task<IActionResult> AddSongsViaUriListToPlaylist(List<string> songUris, string playlistId)
        {
            var tokenEntity = await _accessTokenRepository.GetAccessToken();
            tokenEntity = _accessTokenRepository.ValidateToken(tokenEntity);
            if (tokenEntity == null)
            {
                return Unauthorized();
            }

            var uri = $"{_playlistUriBase}playlists/{playlistId}/tracks";
            var jsonString = JsonConvert.SerializeObject(songUris);
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

            // Set bearer auth
            var client = _authService.GetClientWithBearerAuth(tokenEntity);
            var result = await client.PostAsync(uri, content);
            if (!result.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            return Ok(songUris);
        }
    }
}