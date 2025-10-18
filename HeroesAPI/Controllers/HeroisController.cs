using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroesAPI.Data;
using HeroesAPI.Models;
using HeroesAPI.DTOs;

namespace HeroesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeroisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HeroisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Busca todos os heróis com seus superpoderes
            var herois = await _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                    .ThenInclude(hs => hs.SuperpoderObj)
                .ToListAsync();

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
            var heroi = await _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                    .ThenInclude(hs => hs.SuperpoderObj)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (heroi == null)
                return NotFound(new { message = $"Herói com ID {id} não encontrado" }); // 404

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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var heroiExiste = await _context.Herois
                .AnyAsync(h => h.NomeHeroi.ToLower() == dto.NomeHeroi.ToLower());
            
            if (heroiExiste)
                return BadRequest(new { message = $"Já existe um herói chamado '{dto.NomeHeroi}'" });

            if (dto.SuperpoderesIds == null || dto.SuperpoderesIds.Count == 0)
                return BadRequest(new { message = "Selecione pelo menos um superpoder" });

            var novoHeroi = new Heroi
            {
                Nome = dto.Nome,
                NomeHeroi = dto.NomeHeroi,
                DataNascimento = dto.DataNascimento,
                Altura = dto.Altura,
                Peso = dto.Peso
            };

            novoHeroi.HeroisSuperpoderes = new List<HeroiSuperpoder>();
            foreach (var superpoderId in dto.SuperpoderesIds)
            {
                novoHeroi.HeroisSuperpoderes.Add(new HeroiSuperpoder
                {
                    SuperpoderId = superpoderId
                });
            }

            _context.Herois.Add(novoHeroi);
            await _context.SaveChangesAsync();

            await _context.Entry(novoHeroi)
                .Collection(h => h.HeroisSuperpoderes)
                .Query()
                .Include(hs => hs.SuperpoderObj)
                .LoadAsync();

            var resultado = new HeroiResponseDto
            {
                Id = novoHeroi.Id,
                Nome = novoHeroi.Nome,
                NomeHeroi = novoHeroi.NomeHeroi,
                DataNascimento = novoHeroi.DataNascimento,
                Altura = novoHeroi.Altura,
                Peso = novoHeroi.Peso,
                Superpoderes = novoHeroi.HeroisSuperpoderes.Select(hs => new SuperpoderSimpleDto
                {
                    Id = hs.SuperpoderObj.Id,
                    Superpoder = hs.SuperpoderObj.SuperpoderNome,
                    Descricao = hs.SuperpoderObj.Descricao
                }).ToList()
            };
            
            //  201 com o herói criado
            return CreatedAtAction(
                nameof(GetById), 
                new { id = novoHeroi.Id }, 
                resultado
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, HeroiDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var heroi = await _context.Herois
                .Include(h => h.HeroisSuperpoderes)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (heroi == null)
                return NotFound(new { message = $"Herói com ID {id} não encontrado" }); // 404

            var nomeEmUso = await _context.Herois
                .AnyAsync(h => h.NomeHeroi.ToLower() == dto.NomeHeroi.ToLower() && h.Id != id);
            
            if (nomeEmUso)
                return BadRequest(new { message = $"O nome '{dto.NomeHeroi}' já está em uso" });

            heroi.Nome = dto.Nome;
            heroi.NomeHeroi = dto.NomeHeroi;
            heroi.DataNascimento = dto.DataNascimento;
            heroi.Altura = dto.Altura;
            heroi.Peso = dto.Peso;

            _context.HeroisSuperpoderes.RemoveRange(heroi.HeroisSuperpoderes);

            heroi.HeroisSuperpoderes = new List<HeroiSuperpoder>();
            foreach (var superpoderId in dto.SuperpoderesIds)
            {
                heroi.HeroisSuperpoderes.Add(new HeroiSuperpoder
                {
                    HeroiId = id,
                    SuperpoderId = superpoderId
                });
            }

            await _context.SaveChangesAsync();

            await _context.Entry(heroi)
                .Collection(h => h.HeroisSuperpoderes)
                .Query()
                .Include(hs => hs.SuperpoderObj)
                .LoadAsync();

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
                message = "Herói atualizado com sucesso",
                heroi = resultado
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var heroi = await _context.Herois.FindAsync(id);

            // 404
            if (heroi == null)
                return NotFound(new { message = $"Herói com ID {id} não encontrado" });

            _context.Herois.Remove(heroi);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Herói '{heroi.NomeHeroi}' excluído com sucesso" });
        }
    }
}