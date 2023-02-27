using api.Core.Configuration;
using domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly DataConfiguration _dataConfig;

    public PlaylistController(IOptions<DataConfiguration> dataConfig)
    {
        _dataConfig = dataConfig.Value
            ?? throw new ArgumentNullException(nameof(dataConfig));
    }

    [HttpGet("{token}")]
    public async Task<ActionResult<PlaylistOverview?>> Get(string token)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Accept", "application/json");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue($"Bearer", token);

        var response = await client.GetAsync($"{_dataConfig.ApiUriBase}/{_dataConfig.PlaylistUri}");

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<PlaylistOverview>(content);
        }

        return BadRequest();
    }
}