using api.Services;
using System.Net.Http.Headers;

namespace api.Core.Extensions;
internal static class HttpClientServiceCollectionExtensions
{
    internal static IServiceCollection AddHttpClients(this IServiceCollection services)
    {
        services.AddHttpClient<AuthService>();

        return services;
    }
}