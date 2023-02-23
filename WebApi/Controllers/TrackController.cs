using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Repository.Services;
using System;
using System.Configuration;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/search")]
    public class TrackController : Controller
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IAccessTokenRepository _accessTokenRepository;
        private readonly IAuthService _authService;

        private readonly string _trackUriBase;

        public TrackController(ILogger<TrackController> logger, IMapper mapper,
            IAccessTokenRepository accessTokenRepository, IAuthService authService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _accessTokenRepository = accessTokenRepository ?? throw new ArgumentNullException(nameof(accessTokenRepository));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));

            _trackUriBase = ConfigurationManager.AppSettings["TrackUriBase"];
        }

        [HttpGet("{artist}/{track}")]
        public async Task<IActionResult> SearchTrackAsync(string artist, string track)
        {
            var tokenEntity = await _accessTokenRepository.GetAccessToken();
            tokenEntity = _accessTokenRepository.ValidateToken(tokenEntity);
            if (string.IsNullOrEmpty(tokenEntity.Token))
            {
                return Unauthorized();
            }

            var query = $"q=track:\"{track}\"%20artist:\"{artist}\"&type=track";
            query = System.Web.HttpUtility.UrlEncode(query);

            // Set bearer auth
            var client = _authService.GetClientWithBearerAuth(tokenEntity);
            var response = await client.GetAsync($"{_trackUriBase}?{query}");
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            var content = await response.Content.ReadAsStringAsync();
            var trackOverview = JsonConvert.DeserializeObject<TrackOverview>(content);

            //_logger.Log(trackOverview.tracks.items[0].uri);

            return Ok(trackOverview);
        }
    }
}