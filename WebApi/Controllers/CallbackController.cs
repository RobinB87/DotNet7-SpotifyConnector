using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository.Services;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/callback")]
    public class CallbackController : Controller
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IAccessTokenRepository _accessTokenRepository;
        private readonly IAuthService _spotifyService;

        public CallbackController(ILogger<CallbackController> logger, IMapper mapper,
            IAccessTokenRepository accessTokenRepository, IAuthService spotifyService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _accessTokenRepository = accessTokenRepository ?? throw new ArgumentNullException(nameof(accessTokenRepository));
            _spotifyService = spotifyService ?? throw new ArgumentNullException(nameof(spotifyService));
        }

        [HttpGet]
        public async Task<ActionResult> AddAccessToken()
        {
            // First, delete the current token
            // TODO: Refactor so that it goes via ID
            DeleteToken();

            // Get a new token via Spotify API
            var code = GetCodeFromHttpContext();
            var tokenFromRepoDto = await _spotifyService.GetAccessTokenFromSpotify(code);
            var tokenEntityToSave = _mapper.Map<Repository.Data.Entities.AccessToken>(tokenFromRepoDto);
            tokenEntityToSave.DateModified = DateTime.Now;

            // Store token
            await _accessTokenRepository.AddAccessToken(tokenEntityToSave);

            try
            {
                await _accessTokenRepository.SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Adding an access token failed on save.", ex);
            }

            return Ok();
        }

        private string GetCodeFromHttpContext()
        {
            var code = HttpContext.Request.QueryString.ToString();
            return code.Replace("?code=", "");
        }

        private async void DeleteToken()
        {
            var tokenEntity = await _accessTokenRepository.GetAccessToken();
            try
            {
                _accessTokenRepository.DeleteToken(tokenEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError("Deleting an old access token failed.", ex);
            }
        }
    }
}