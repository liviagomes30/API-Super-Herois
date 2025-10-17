using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HeroesAPI.Models
{
    public class Superpoder
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("Superpoder")] 
        public string SuperpoderNome { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Descricao { get; set; } 

        public List<HeroiSuperpoder> HeroisSuperpoderes { get; set; } = new();
    }
}