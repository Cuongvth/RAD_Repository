using CMS_WebDesignCore.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_WebDesignCore.DTO
{
    public class GoogleIdenDTO<T>
    {
        public string GoogleIdenData { get; set; }
        public FullInfo<T> Result { get; set; }
        public IdenEnum Status { get; set; }
    }
}
