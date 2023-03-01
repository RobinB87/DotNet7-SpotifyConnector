using Newtonsoft.Json;

namespace api.Dtos;
public class AddTracksRequest
{
    public string PlaylistId { get; set; } = string.Empty;
    public string Uris { get; set; } = string.Empty;
}

internal static class AddTracksRequestExtensions
{
    internal static string CreateUriArrayString(this AddTracksRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Uris)) return string.Empty;

        var uriArray = req.Uris.Split(';');
        if (!uriArray.Any()) return string.Empty;

        var trailing = "spotify:track:";
        var uriList = new List<string>();
        foreach (var uri in uriArray)
        {
            if (uri.StartsWith(trailing)) uriList.Add(uri);
            else uriList.Add($"{trailing}{uri}");
        }

        return JsonConvert.SerializeObject(uriList);
    }
}