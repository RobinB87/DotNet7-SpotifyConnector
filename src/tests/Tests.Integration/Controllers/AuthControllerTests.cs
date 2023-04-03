using Microsoft.AspNetCore.Mvc.Testing;

namespace tests.integration.Controllers
{
    public class AuthControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AuthControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetSpotifyLoginUri_Returns_SuccessStatusCode()
        {
            var response = await _client.GetAsync("/auth/login");
            response.EnsureSuccessStatusCode();
        }
    }
}