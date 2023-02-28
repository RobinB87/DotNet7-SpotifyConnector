using api.Controllers;
using Microsoft.Net.Http.Headers;
using System.Net.Http.Headers;

namespace api.Core.Extensions;
internal static class PlaylistControllerExtensions
{
    internal static HttpRequestMessage CreateRequestMessageWithBearerToken(
        this PlaylistController controller,
        HttpMethod method, 
        string uri)
    {
        var token = controller.Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

        var request = new HttpRequestMessage(method, uri);
        request.Headers.Add("Accept", "application/json");
        request.Headers.Authorization = new AuthenticationHeaderValue($"Bearer", token);
        return request;
    }
}