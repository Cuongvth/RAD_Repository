using CMS_WebDesignCore.Entities.Entities_AI_Interpreter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.IBusiness.IDusiness_AI_Interpreter
{
    public interface ITextRecognitionService
    {
        Task<List<List<ParagraphInfo>>> GetTranslatedTextBlocks(string imagePath, string targetLanguage);
    }
}
