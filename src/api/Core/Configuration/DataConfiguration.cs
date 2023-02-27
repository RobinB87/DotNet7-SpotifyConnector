namespace api.Core.Configuration;
public class DataConfiguration
{
    public const string AppSettingsName = "Data";

    public string ApiUriBase { get; set; } = string.Empty;
    public string PlaylistUri { get; set; } = string.Empty;
    public string SearchUri { get; set; } = string.Empty;
}