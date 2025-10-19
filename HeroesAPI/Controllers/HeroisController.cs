using Microsoft.AspNetCore.Mvc;
using HeroesAPI.DTOs;
using HeroesAPI.Services.Interfaces;

namespace HeroesAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class HeroisController : ControllerBase
{
    private readonly IHeroiService _heroiService;

    public HeroisController(IHeroiService heroiService)
    {
      _heroiService = heroiService;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var herois = await _heroiService.GetAllAsync();

        if (herois.Count == 0)
            return NoContent(); // 204

        var resultado = herois.Select(h => new HeroiResponseDto
        {
            Id = h.Id,
            Nome = h.Nome,
            NomeHeroi = h.NomeHeroi,
            DataNascimento = h.DataNascimento,
            Altura = h.Altura,
            Peso = h.Peso,
            Superpoderes = h.HeroisSuperpoderes.Select(hs => new SuperpoderSimpleDto
            {
                Id = hs.SuperpoderObj.Id,
                Superpoder = hs.SuperpoderObj.SuperpoderNome,
                Descricao = hs.SuperpoderObj.Descricao
            }).ToList()
        }).ToList();

        return Ok(resultado);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var heroi = await _heroiService.GetByIdAsync(id);

        if (heroi == null)
            return NotFound(new { message = $"Herói com ID {id} não encontrado" });

        var resultado = new HeroiResponseDto
        {
            Id = heroi.Id,
            Nome = heroi.Nome,
            NomeHeroi = heroi.NomeHeroi,
            DataNascimento = heroi.DataNascimento,
            Altura = heroi.Altura,
            Peso = heroi.Peso,
            Superpoderes = heroi.HeroisSuperpoderes.Select(hs => new SuperpoderSimpleDto
            {
                Id = hs.SuperpoderObj.Id,
                Superpoder = hs.SuperpoderObj.SuperpoderNome,
                Descricao = hs.SuperpoderObj.Descricao
            }).ToList()
        };

        return Ok(resultado);
    }

    
    [HttpPost]
    public async Task<IActionResult> Create(HeroiDto dto)
    {
        // Valida ModelState (Data Annotations)
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _heroiService.CreateAsync(dto);

        if (!result.Success)
            return BadRequest(new { message = result.ErrorMessage });

        var heroi = result.Data!;
        var resultado = new HeroiResponseDto
        {
            Id = heroi.Id,
            Nome = heroi.Nome,
            NomeHeroi = heroi.NomeHeroi,
            DataNascimento = heroi.DataNascimento,
            Altura = heroi.Altura,
            Peso = heroi.Peso,
            Superpoderes = heroi.HeroisSuperpoderes.Select(hs => new SuperpoderSimpleDto
            {
              Id = hs.SuperpoderObj.Id,
              Superpoder = hs.SuperpoderObj.SuperpoderNome,
              Descricao = hs.SuperpoderObj.Descricao
            }).ToList()
        };

        // Retorna 201 Created
        return CreatedAtAction(nameof(GetById), new { id = heroi.Id }, resultado);
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, HeroiDto dto)
    {
      // Valida ModelState (Data Annotations)
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var result = await _heroiService.UpdateAsync(id, dto);

      if (!result.Success)
      {
        // Se não encontrou, retorna 404
        if (result.ErrorMessage!.Contains("não encontrado"))
            return NotFound(new { message = result.ErrorMessage });

        // Outros erros retornam 400
        return BadRequest(new { message = result.ErrorMessage });
      }

      // Monta a resposta
      var heroi = result.Data!;
      var resultado = new HeroiResponseDto
      {
          Id = heroi.Id,
          Nome = heroi.Nome,
          NomeHeroi = heroi.NomeHeroi,
          DataNascimento = heroi.DataNascimento,
          Altura = heroi.Altura,
          Peso = heroi.Peso,
          Superpoderes = heroi.HeroisSuperpoderes.Select(hs => new SuperpoderSimpleDto
          {
              Id = hs.SuperpoderObj.Id,
              Superpoder = hs.SuperpoderObj.SuperpoderNome,
              Descricao = hs.SuperpoderObj.Descricao
          }).ToList()
      };

      return Ok(new
      {
          message = result.SuccessMessage,
          heroi = resultado
      });
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var result = await _heroiService.DeleteAsync(id);

      if (!result.Success)
          return NotFound(new { message = result.ErrorMessage });

      return Ok(new { message = result.SuccessMessage });
    }
  }
}