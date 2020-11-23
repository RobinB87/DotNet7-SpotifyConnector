using Repository.Data.Entities;
using System.Linq;

namespace Repository.Data
{
    public static class DatabaseContextExtensions
    {
        public static void EnsureSeedDataForContext(this DatabaseContext context)
        {
            if (context.AccessTokens.Any())
            {
                return;
            }

            context.Add(new AccessToken
            {
                Token = "bla",
                Type = "bla",
                ExpiresIn = 3600,
                Scope = "playlist-modify-public",
            });

            context.SaveChanges();
        }
    }
}
