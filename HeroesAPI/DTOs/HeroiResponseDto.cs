using System;
using System.Collections.Generic;

namespace HeroesAPI.DTOs
{
    public class HeroiResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string NomeHeroi { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public float Altura { get; set; }
        public float Peso { get; set; }
        public List<SuperpoderSimpleDto> Superpoderes { get; set; } = new();
    }

    public class SuperpoderSimpleDto
    {
        public int Id { get; set; }
        public string Superpoder { get; set; } = string.Empty;
        public string? Descricao { get; set; }
    }
}