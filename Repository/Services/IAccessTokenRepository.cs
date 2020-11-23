
using System.Threading.Tasks;
using Repository.Data.Entities;

namespace Repository.Services
{
    public interface IAccessTokenRepository
    {
        Task<AccessToken> GetAccessToken();
        AccessToken ValidateToken(AccessToken token);

        Task AddAccessToken(AccessToken token);
        void DeleteToken(AccessToken token);

        Task<bool> SaveAsync();
    }
}
