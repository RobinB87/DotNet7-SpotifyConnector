using domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace persistence;
public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions options) : base(options) { }
}