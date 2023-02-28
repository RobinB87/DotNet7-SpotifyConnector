using Newtonsoft.Json;

namespace api.Services;
public class ApiService
{
    private readonly HttpClient _client;

    public ApiService(HttpClient client)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
    }

    public async Task<T?> GetWithBearerToken<T>(HttpRequestMessage requestMessage)
    {
        var response = await _client.SendAsync(requestMessage);
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var deserialized = JsonConvert.DeserializeObject<T>(content);
            return deserialized;
        }

        return default;
    }
}