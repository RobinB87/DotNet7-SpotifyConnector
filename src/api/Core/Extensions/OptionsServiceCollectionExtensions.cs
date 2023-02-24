namespace api.Core.Extensions;
internal static class OptionsServiceCollectionExtensions
{
    internal static IServiceCollection ConfigureOptions<T>(this IServiceCollection services,
        IConfigurationSection section) where T : class
    {
        services
            .AddOptions<T>()
            .Bind(section)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        return services;
    }
}