using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartJobBackend.Models;
using static SmartJobBackend.DTOs.AuthDTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartJobBackend.Services
{
	public class AuthService
	{
		private readonly AppDbContext _db;
		private readonly IConfiguration _config;

		public AuthService(AppDbContext db, IConfiguration config)
		{
			_db = db;
			_config = config;
		}

		public async Task<(string? Error, AuthResponseDTO? Response)> Register(RegisterDTO dto)
		{
			if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
				return ("USERNAME_TAKEN", null); // Användarnamn redan taget

			if (await _db.Users.AnyAsync(u => u.Email == dto.Email.ToLower()))
				return ("EMAIL_TAKEN", null); // Email redan tagen

			var user = new User
			{
				Username = dto.Username,
				Email = dto.Email.ToLower(),
				PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
			};

			_db.Users.Add(user);
			await _db.SaveChangesAsync();

			return (null, new AuthResponseDTO(GenerateToken(user), user.Email, user.Username));
		}

		public async Task<AuthResponseDTO?> Login(LoginDTO dto)
		{
			var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email.ToLower());

			if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
				return null; // Fel email eller lösenord

			return new AuthResponseDTO(GenerateToken(user), user.Email, user.Username);
		}

		private string GenerateToken(User user)
		{
			var key = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email)
		};

			var token = new JwtSecurityToken(
				issuer: _config["Jwt:Issuer"],
				audience: _config["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddDays(7),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
