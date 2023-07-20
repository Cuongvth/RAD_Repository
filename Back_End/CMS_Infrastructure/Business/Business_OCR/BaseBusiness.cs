using CMS_Infrastructure.Context;

namespace CMS_Infrastructure.Business.Business_OCR
{
    public class BaseBusiness
    {
        public ComputerVisionContext _context;

        public BaseBusiness()
        {
            _context = new ComputerVisionContext();
        }
    }
}
