using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RRS_Model.Base
{
    public class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DataType(DataType.DateTime)]
        [Display(Name = "Date Added")]
        public DateTime DateAdded { get; set; }

        [DataType(DataType.DateTime)]
        [Display(Name = "Date Modified")]
        public DateTime DateModified { get; set; }

        public BaseEntity()
        {
            DateAdded = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}
