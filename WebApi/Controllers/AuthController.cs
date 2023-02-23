using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository.Services;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ILogger _logger;
        private readonly IAccessTokenRepository _accessTokenRepository;
        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger, IAccessTokenRepository accessTokenRepository, IAuthService authService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _accessTokenRepository = accessTokenRepository ?? throw new ArgumentNullException(nameof(accessTokenRepository));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        public async Task<ActionResult<string>> GetSpotifyLoginUri()
        {
            return await _authService.GetLoginUri();
        }
    }
}