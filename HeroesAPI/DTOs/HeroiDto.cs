using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HeroesAPI.DTOs
{
    public class HeroiDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [MaxLength(120)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nome do herói é obrigatório")]
        [MaxLength(120)]
        public string NomeHeroi { get; set; } = string.Empty;

        [Required(ErrorMessage = "Selecione pelo menos um superpoder")]
        public List<int> SuperpoderesIds { get; set; } = new();

        [Required(ErrorMessage = "Data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Altura é obrigatória")]
        [Range(0.01, 10.0, ErrorMessage = "Altura deve estar entre 0.01 e 10m")]
        public float Altura { get; set; }

        [Required(ErrorMessage = "Peso é obrigatório")]
        [Range(0.1, 1000.0, ErrorMessage = "Peso deve estar entre 0.1 e 1000kg")]
        public float Peso { get; set; }
    }
}