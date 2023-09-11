namespace CMS_WebDesignCore.Entities.Entities_AI_Interpreter
{
    public class ImageBlock
    {
        public string ImagePath { get; set; }
        public List<List<ParagraphInfo>> TextAnnotations { get; set; }
    }
}
