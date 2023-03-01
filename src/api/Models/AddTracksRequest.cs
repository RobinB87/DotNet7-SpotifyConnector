namespace api.Models;
public class AddTracksRequest
{
    public string PlaylistId { get; set; } = string.Empty;
    public string Uris { get; set; } = string.Empty;
}