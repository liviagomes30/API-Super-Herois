using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HeroesAPI.Models
{
    public class Heroi
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        [MaxLength(120)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nome do herói é obrigatório")]
        [MaxLength(120)]
        public string NomeHeroi { get; set; } = string.Empty;

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required]
        public float Altura { get; set; }

        [Required]
        public float Peso { get; set; }

        public List<HeroiSuperpoder> HeroisSuperpoderes { get; set; } = new();
    }
}