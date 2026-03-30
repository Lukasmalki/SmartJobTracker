namespace SmartJobBackend.DTOs
{
	public class AuthDTOs
	{

		public record RegisterDTO(string Email, string Password);
		public record LoginDTO(string Email, string Password);
		public record AuthResponseDTO(string Token, string Email);
	}
}
