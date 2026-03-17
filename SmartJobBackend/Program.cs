using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace SmartJobBackend
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowReact",
					p => p.WithOrigins("http://localhost:5173", "https://localhost:5173")
						  .AllowAnyHeader()
						  .AllowAnyMethod());
			});

			builder.Services.AddDbContext<AppDbContext>(options =>
			options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

			var app = builder.Build();

			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.UseCors("AllowReact");
			app.UseAuthorization();
			app.MapControllers();

			app.Run();
		}
	}
}