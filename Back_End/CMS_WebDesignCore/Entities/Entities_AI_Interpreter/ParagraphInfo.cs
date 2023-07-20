using Google.Apis.Vision.v1.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.Entities.Entities_AI_Interpreter
{
    public class ParagraphInfo
    {
        public string TranslatedText { get; set; }
        public string Text { get; set; }

        public BoundingPoly BoundingPoly { get; set; }
    }
}
