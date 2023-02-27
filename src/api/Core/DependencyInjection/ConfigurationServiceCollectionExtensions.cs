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
        services.ConfigureOptions<DataConfiguration>(configuration.GetSection(DataConfiguration.AppSettingsName));

        return services;
    }
}