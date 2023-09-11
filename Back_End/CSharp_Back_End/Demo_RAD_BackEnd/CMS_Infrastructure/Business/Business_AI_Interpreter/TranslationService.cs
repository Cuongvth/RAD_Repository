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
            var translations = new List<string>();

            foreach (var text in texts)
            {
                var translation = await TranslateSingleText(text, targetLanguage);
                translations.Add(translation);
            }

            return translations;
        }


        private async Task<string> TranslateSingleText(string text, string targetLanguage)
        {
            var baseUrl = "https://translation.googleapis.com/language/translate/v2";
            var url = $"{baseUrl}?key={_apiKey}";

            var requestData = new
            {
                q = text,
                target = targetLanguage
            };

            var jsonRequestData = JsonConvert.SerializeObject(requestData);
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            var jsonResponse = JObject.Parse(responseContent);
            var translation = jsonResponse["data"]["translations"][0]["translatedText"].ToString();

            return translation;
        }

    }
}
