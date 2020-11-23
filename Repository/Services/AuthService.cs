using Newtonsoft.Json;
using Repository.Properties;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Repository.Data.Entities;

namespace Repository.Services
{
    public class AuthService : IAuthService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _redirectUri;
        private readonly string _spotifyUriBase;
        private readonly string _tokenRequestUri;
        private readonly HttpClient _client;

        public AuthService()
        {
            _clientId = ConfigurationManager.AppSettings["ClientId"];
            _clientSecret = ConfigurationManager.AppSettings["ClientSecret"];
            _redirectUri = ConfigurationManager.AppSettings["RedirectUri"];
            _spotifyUriBase = ConfigurationManager.AppSettings["SpotifyUriBase"];
            _tokenRequestUri = ConfigurationManager.AppSettings["TokenRequestUri"];
            _client = new HttpClient();
        }

        public HttpClient GetClientWithBearerAuth(AccessToken token)
        {
            _client.DefaultRequestHeaders.Add("Accept", "application/json");
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue($"Bearer", token.Token);
            return _client;
        }

        public async Task<string> GetLoginUri()
        {
            // Create Uri Builder
            var builder = new UriBuilder(_spotifyUriBase) { Port = -1 };

            // Create the query
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["client_id"] = ConfigurationManager.AppSettings["ClientId"];
            query["response_type"] = ConfigurationManager.AppSettings["ResponseType"];
            query["redirect_uri"] = ConfigurationManager.AppSettings["RedirectUri"];
            query["scope"] = ConfigurationManager.AppSettings["Scopes"];

            builder.Query = query.ToString();

            // Remove headers as they are not used here
            var response = await _client.GetAsync(builder.ToString());
            return !response.IsSuccessStatusCode ? string.Empty : response.RequestMessage.RequestUri.ToString();
        }

        public async Task<Data.Dtos.AccessToken> GetAccessTokenFromSpotify(string code)
        {
            var content = Resources.ResourceManager.GetString("TokenRequestBody");
            var body = Utils.CreateMessageBody(content, "application/x-www-form-urlencoded",
                    new Dictionary<string, object>
                    {
                        {"code", code},
                        {"redirectUri", _redirectUri},
                    });

            // Content type header
            var request = new HttpRequestMessage(HttpMethod.Post, _tokenRequestUri)
            {
                Content = body
            };

            // Set basic auth to get access token
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue($"Basic",
                Convert.ToBase64String(
                    Encoding.ASCII.GetBytes(_clientId + ":" + _clientSecret)));

            var response = await _client.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<Data.Dtos.AccessToken>(responseContent);
        }
    }
}
