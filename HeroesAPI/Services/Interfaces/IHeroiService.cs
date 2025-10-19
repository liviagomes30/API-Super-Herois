using HeroesAPI.DTOs;
using HeroesAPI.Models;

namespace HeroesAPI.Services.Interfaces
{
public interface IHeroiService
{
  
  Task<List<Heroi>> GetAllAsync();

  
  Task<Heroi?> GetByIdAsync(int id);

  Task<ServiceResult<Heroi>> CreateAsync(HeroiDto dto);

  
  Task<ServiceResult<Heroi>> UpdateAsync(int id, HeroiDto dto);


  Task<ServiceResult> DeleteAsync(int id);
}
}