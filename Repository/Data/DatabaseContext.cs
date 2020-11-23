using Microsoft.EntityFrameworkCore;
using Repository.Data.Entities;

namespace Repository.Data
{
    public sealed class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Database.Migrate();
        }

        public DbSet<AccessToken> AccessTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccessToken>();
        }
    }
}
