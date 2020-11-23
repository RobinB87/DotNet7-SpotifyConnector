using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.Data.Entities;

namespace Repository.Services
{
    public class AccessTokenRepository : IAccessTokenRepository
    {
        private readonly DatabaseContext _context;
        public AccessTokenRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<AccessToken> GetAccessToken()
        {
            return await _context.AccessTokens.FirstOrDefaultAsync();
        }

        public AccessToken ValidateToken(AccessToken token)
        {
            var tokenExpirationDate = token.DateModified.AddSeconds(token.ExpiresIn);
            if (string.IsNullOrEmpty(token.Token) || tokenExpirationDate < DateTime.Now)
            {
                return new AccessToken { DateModified = DateTime.Now };
            }

            return token;
        }

        public async Task AddAccessToken(AccessToken token)
        {
            await _context.AccessTokens.AddAsync(token);
        }

        public void DeleteToken(AccessToken token)
        {
            _context.AccessTokens.Remove(token);
        }

        public async Task<bool> SaveAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
    }
}
