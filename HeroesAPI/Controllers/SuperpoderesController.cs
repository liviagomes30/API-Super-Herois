using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroesAPI.Data;
using HeroesAPI.DTOs;

namespace HeroesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuperpoderesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SuperpoderesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var superpoderes = await _context.Superpoderes
                .Select(s => new SuperpoderSimpleDto
                {
                    Id = s.Id,
                    Superpoder = s.SuperpoderNome,
                    Descricao = s.Descricao
                })
                .ToListAsync();

            return Ok(superpoderes);
        }
    }
}