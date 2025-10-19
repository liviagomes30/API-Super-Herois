using Microsoft.EntityFrameworkCore;
using HeroesAPI.Data;
using HeroesAPI.DTOs;
using HeroesAPI.Models;
using HeroesAPI.Services.Interfaces;

namespace HeroesAPI.Services
{
  public class HeroiService : IHeroiService
  {
    private readonly AppDbContext _context;

    public HeroiService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Heroi>> GetAllAsync()
    {
      return await _context.Herois
        .Include(h => h.HeroisSuperpoderes)
            .ThenInclude(hs => hs.SuperpoderObj)
        .ToListAsync();
    }

    public async Task<Heroi?> GetByIdAsync(int id)
    {
        return await _context.Herois
            .Include(h => h.HeroisSuperpoderes)
                .ThenInclude(hs => hs.SuperpoderObj)
            .FirstOrDefaultAsync(h => h.Id == id);
    }

    public async Task<ServiceResult<Heroi>> CreateAsync(HeroiDto dto)
    {
      // nome de herói único
      var heroiExiste = await _context.Herois
          .AnyAsync(h => h.NomeHeroi.ToLower() == dto.NomeHeroi.ToLower());

      if (heroiExiste)
          return ServiceResult<Heroi>.Fail($"Já existe um herói chamado '{dto.NomeHeroi}'");

      // pelo menos um superpoder
      if (dto.SuperpoderesIds == null || dto.SuperpoderesIds.Count == 0)
          return ServiceResult<Heroi>.Fail("Selecione pelo menos um superpoder");

      // data de nascimento
      var dataValidation = ValidateDataNascimento(dto.DataNascimento);
      if (!dataValidation.Success)
          return ServiceResult<Heroi>.Fail(dataValidation.ErrorMessage!);

      // superpoderes existem no banco
      var superpoderesValidation = await ValidateSuperpoderesExistemAsync(dto.SuperpoderesIds);
      if (!superpoderesValidation.Success)
          return ServiceResult<Heroi>.Fail(superpoderesValidation.ErrorMessage!);

      var novoHeroi = new Heroi
      {
          Nome = dto.Nome,
          NomeHeroi = dto.NomeHeroi,
          DataNascimento = dto.DataNascimento,
          Altura = dto.Altura,
          Peso = dto.Peso,
          HeroisSuperpoderes = dto.SuperpoderesIds.Select(spId => new HeroiSuperpoder
          {
              SuperpoderId = spId
          }).ToList()
      };

      _context.Herois.Add(novoHeroi);
      await _context.SaveChangesAsync();

      // Recarrega com as navegações
      await _context.Entry(novoHeroi)
          .Collection(h => h.HeroisSuperpoderes)
          .Query()
          .Include(hs => hs.SuperpoderObj)
          .LoadAsync();

      return ServiceResult<Heroi>.Ok(novoHeroi, "Herói criado com sucesso");
    }

    public async Task<ServiceResult<Heroi>> UpdateAsync(int id, HeroiDto dto)
    {
      // Busca
      var heroi = await _context.Herois
          .Include(h => h.HeroisSuperpoderes)
          .FirstOrDefaultAsync(h => h.Id == id);

      if (heroi == null)
          return ServiceResult<Heroi>.Fail($"Herói com ID {id} não encontrado");

      var nomeEmUso = await _context.Herois
          .AnyAsync(h => h.NomeHeroi.ToLower() == dto.NomeHeroi.ToLower() && h.Id != id);

      if (nomeEmUso)
          return ServiceResult<Heroi>.Fail($"O nome '{dto.NomeHeroi}' já está em uso");

      if (dto.SuperpoderesIds == null || dto.SuperpoderesIds.Count == 0)
          return ServiceResult<Heroi>.Fail("Selecione pelo menos um superpoder");

      var dataValidation = ValidateDataNascimento(dto.DataNascimento);
      if (!dataValidation.Success)
          return ServiceResult<Heroi>.Fail(dataValidation.ErrorMessage!);

      var superpoderesValidation = await ValidateSuperpoderesExistemAsync(dto.SuperpoderesIds);
      if (!superpoderesValidation.Success)
          return ServiceResult<Heroi>.Fail(superpoderesValidation.ErrorMessage!);

      heroi.Nome = dto.Nome;
      heroi.NomeHeroi = dto.NomeHeroi;
      heroi.DataNascimento = dto.DataNascimento;
      heroi.Altura = dto.Altura;
      heroi.Peso = dto.Peso;

      // Atualiza os superpoderes
      _context.HeroisSuperpoderes.RemoveRange(heroi.HeroisSuperpoderes);
      heroi.HeroisSuperpoderes = dto.SuperpoderesIds.Select(spId => new HeroiSuperpoder
      {
          HeroiId = id,
          SuperpoderId = spId
      }).ToList();

      await _context.SaveChangesAsync();

      // Recarrega com as navegações
      await _context.Entry(heroi)
          .Collection(h => h.HeroisSuperpoderes)
          .Query()
          .Include(hs => hs.SuperpoderObj)
          .LoadAsync();

      return ServiceResult<Heroi>.Ok(heroi, "Herói atualizado com sucesso");
    }

    public async Task<ServiceResult> DeleteAsync(int id)
    {
      var heroi = await _context.Herois.FindAsync(id);

      if (heroi == null)
          return ServiceResult.Fail($"Herói com ID {id} não encontrado");

      var nomeHeroi = heroi.NomeHeroi;

      _context.Herois.Remove(heroi);
      await _context.SaveChangesAsync();

      return ServiceResult.Ok($"Herói '{nomeHeroi}' excluído com sucesso");
    }


  
    private ServiceResult ValidateDataNascimento(DateTime data)
    {
      if (data > DateTime.Now)
          return ServiceResult.Fail("A data de nascimento não pode ser no futuro");

      if (data < new DateTime(1900, 1, 1))
          return ServiceResult.Fail("A data de nascimento deve ser posterior a 01/01/1900");

      var idade = DateTime.Now.Year - data.Year;
      if (data > DateTime.Now.AddYears(-idade))
          idade--;

      if (idade > 150)
          return ServiceResult.Fail("Data de nascimento inválida (idade superior a 150 anos)");

      return ServiceResult.Ok();
    }

  
    private async Task<ServiceResult> ValidateSuperpoderesExistemAsync(List<int> superpoderesIds)
    {
        foreach (var id in superpoderesIds)
        {
            var existe = await _context.Superpoderes.AnyAsync(s => s.Id == id);
            if (!existe)
                return ServiceResult.Fail($"Superpoder com ID {id} não existe");
        }

        return ServiceResult.Ok();
    }

  }
}