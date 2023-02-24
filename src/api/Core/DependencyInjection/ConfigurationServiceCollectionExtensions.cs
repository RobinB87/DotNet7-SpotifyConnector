using api.Core.Configuration;
using api.Core.Extensions;

namespace api.Core.DependencyInjection;
internal static class ConfigurationServiceCollectionExtensions
{
    internal static IServiceCollection AddConfigurationOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<SpotifyConfiguration>(configuration.GetSection(SpotifyConfiguration.AppSettingsName));

        return services;
    }
}