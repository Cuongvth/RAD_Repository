using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace CMS_Infrastructure.Business.Business_AI_Interpreter
{
    public class TranslationService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public TranslationService(string apiKey)
        {
            _httpClient = new HttpClient();
            _apiKey = apiKey;
        }

        public async Task<List<string>> TranslateText(List<string> texts, string targetLanguage)
        {
            List<string> translations = new();

            foreach (string text in texts)
            {
                string translation = await TranslateSingleText(text, targetLanguage);
                translations.Add(translation);
            }

            return translations;
        }


        private async Task<string> TranslateSingleText(string text, string targetLanguage)
        {
            string baseUrl = "https://translation.googleapis.com/language/translate/v2";
            string url = $"{baseUrl}?key={_apiKey}";

            var requestData = new
            {
                q = text,
                target = targetLanguage
            };

            string jsonRequestData = JsonConvert.SerializeObject(requestData);
            StringContent content = new(jsonRequestData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync(url, content);
            string responseContent = await response.Content.ReadAsStringAsync();

            JObject jsonResponse = JObject.Parse(responseContent);
            string translation = jsonResponse["data"]["translations"][0]["translatedText"].ToString();

            return translation;
        }

    }
}
