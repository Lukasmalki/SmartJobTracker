using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartJobBackend.Services;
using System.Security.Claims;
using static SmartJobBackend.DTOs.AuthDTOs;

namespace SmartJobBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly AuthService _authService;

		public AuthController(AuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(RegisterDTO dto)
		{
			var result = await _authService.Register(dto);
			if (result == null)
				return Conflict("Email redan registrerad.");
			return Ok(result);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDTO dto)
		{
			var result = await _authService.Login(dto);
			if (result == null)
				return Unauthorized("Fel email eller lösenord.");

			return Ok(result);
		}
	}

}