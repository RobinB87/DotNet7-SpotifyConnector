using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository.Services;

namespace WebApi.Controllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ILogger _logger;
        private readonly IAccessTokenRepository _accessTokenRepository;
        private readonly IAuthService _authService;

        /// <summary>
        /// Initializes a new instance of <see cref="AuthController" />
        /// </summary>
        /// <param name="logger">The logger</param>
        /// <param name="accessTokenRepository">The access token repository</param>
        /// <param name="authService">The access token repository</param>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="logger" /> is null.</exception>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="accessTokenRepository" /> is null.</exception>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="authService" /> is null.</exception>
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
