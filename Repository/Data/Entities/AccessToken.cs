using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Data.Entities
{
    public class AccessToken
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public long ExpiresIn { get; set; }
        [Required]
        public string Scope { get; set; }
        [Required]
        public string RefreshToken { get; set; }

        [Required]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        [Required]
        public DateTime DateModified { get; set; }
    }
}
