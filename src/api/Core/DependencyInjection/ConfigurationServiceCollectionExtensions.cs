using api.Core.Configuration;
using api.Core.Extensions;

namespace api.Core.DependencyInjection;
internal static class ConfigurationServiceCollectionExtensions
{
    internal static IServiceCollection AddConfigurationOptions(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.ConfigureOptions<AuthConfiguration>(configuration.GetSection(AuthConfiguration.AppSettingsName));
        services.ConfigureOptions<ApiConfiguration>(configuration.GetSection(ApiConfiguration.AppSettingsName));

        return services;
    }
}