using Microsoft.AspNetCore.Identity;

namespace domain;
public class User : IdentityUser
{
    public string Name { get; set; } = string.Empty;
}