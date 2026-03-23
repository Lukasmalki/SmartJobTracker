using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmartJobBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartJobBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		private IConfiguration _config;

		public LoginController(IConfiguration config)
		{
			_config = config;
		}

		[AllowAnonymous]
		[HttpPost]
		public IActionResult Login([FromBody] User login)
		{
			IActionResult response = Unauthorized();
			var user = AuthenticateUser(login);
			if (user != null)
			{
				var tokenString = GenerateJSONWebToken(user);
				response = Ok(new { token = tokenString });
			}
			return response;
		}

		private User AuthenticateUser(User login)
		{
			User user = null;

			if (login.Username.ToLower() == "luki")
			{
				user = new User { Username = login.Username, Email = login.Email };
			}
			return user;
		}

		private string GenerateJSONWebToken(User userInfo)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
				new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var token = new JwtSecurityToken(_config["Jwt:Issuer"],
			  _config["Jwt:Issuer"],
			  claims,
			  expires: DateTime.Now.AddMinutes(30),
			  signingCredentials: credentials);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
