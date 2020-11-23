using System.Runtime.Serialization;

namespace Repository.Data.Dtos
{
    [DataContract]
    public class AccessToken
    {
        [DataMember(Name="access_token")]
        public string Token { get; set; }
        [DataMember(Name = "token_type")]
        public string Type { get; set; }
        [DataMember(Name= "expires_in")]
        public long ExpiresIn { get; set; }
        [DataMember(Name = "refresh_token")]
        public string RefreshToken { get; set; }
        [DataMember(Name = "scope")]
        public string Scope { get; set; }
    }
}
