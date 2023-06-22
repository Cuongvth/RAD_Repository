using CMS_Infrastructure.Context;

namespace CMS_Infrastructure.Business
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
