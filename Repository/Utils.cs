using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Repository
{
    public static class Utils
    {
        /// <summary>
        /// Constructs a message body based on a json file and replaces given placeholders.
        /// </summary>
        public static StringContent CreateMessageBody(string body, string mediaType, Dictionary<string, object> placeholders = null)
        {
            if (string.IsNullOrWhiteSpace(body)) return null;
            if (placeholders != null)
            {
                foreach (var pair in placeholders)
                {
                    body = body.Replace($"{{{{{pair.Key}}}}}", pair.Value.ToString());
                }
            }

            return new StringContent(body, Encoding.UTF8, mediaType);
        }
    }
}