using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;

namespace CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter
{
    public interface ITextRecognitionService
    {
        Task<List<List<ParagraphInfo>>> GetTranslatedTextBlocks(string imagePath, string targetLanguage);
    }
}
