using Microsoft.AspNetCore.Identity;

namespace Domain;
public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public ICollection<Note> Notes { get; set; } = new List<Note>();

}
