using System.Net.Http;
using System.Threading.Tasks;
using Repository.Data.Entities;

namespace Repository.Services
{
    public interface IAuthService
    {
        HttpClient GetClientWithBearerAuth(AccessToken token);
        Task<string> GetLoginUri();
        Task<Data.Dtos.AccessToken> GetAccessTokenFromSpotify(string code);
    }
}