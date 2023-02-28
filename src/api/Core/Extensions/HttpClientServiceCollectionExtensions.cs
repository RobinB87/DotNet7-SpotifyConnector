using api.Core.Configuration;
using api.Services;

namespace api.Core.Extensions;
internal static class HttpClientServiceCollectionExtensions
{
    internal static IServiceCollection AddHttpClients(
        this IServiceCollection services, IConfiguration config)
    {
        var authConfig = config.GetSection(AuthConfiguration.AppSettingsName).Get<AuthConfiguration>();
        var apiConfig = config.GetSection(ApiConfiguration.AppSettingsName).Get<ApiConfiguration>();
            
        services.AddHttpClient<AuthService>(o =>
        {
            o.BaseAddress = new Uri(authConfig!.BaseUri);
        });

        services.AddHttpClient<ApiService>(o =>
        {
            o.BaseAddress = new Uri(apiConfig!.BaseUri);
        });

        return services;
    }
}