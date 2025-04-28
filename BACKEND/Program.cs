namespace BACKEND
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);
      builder.Services.AddControllers();
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      var app = builder.Build();
      app.UseCors(builder =>builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
      app.UseSwagger();
      app.UseSwaggerUI();

      app.UseRouting();
      app.MapControllers();

      app.Run();
    }
  }
}
