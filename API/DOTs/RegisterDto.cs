using System.ComponentModel.DataAnnotations;

namespace API.DOTs
{
    public class RegisterDto
    {
        [Required]
        public string Displayname { get; set; }
        [Required]
        public string Username { get; set;}
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,40}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

    }
}