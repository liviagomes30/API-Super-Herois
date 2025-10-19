namespace HeroesAPI.Services
{
  public class ServiceResult
  {
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
    public string? SuccessMessage { get; set; }

    public static ServiceResult Ok(string? message = null)
        => new ServiceResult { Success = true, SuccessMessage = message };

    public static ServiceResult Fail(string errorMessage)
        => new ServiceResult { Success = false, ErrorMessage = errorMessage };
  }

  
  public class ServiceResult<T> : ServiceResult
  {
    public T? Data { get; set; }

    public static ServiceResult<T> Ok(T data, string? message = null)
      => new ServiceResult<T> { Success = true, Data = data, SuccessMessage = message };

    public static new ServiceResult<T> Fail(string errorMessage)
      => new ServiceResult<T> { Success = false, ErrorMessage = errorMessage };
  }
}