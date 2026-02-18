namespace SmartJobBackend.Models
{
	public class JobApplication
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public string Company { get; set; } = string.Empty;
		public string Role { get; set; } = string.Empty;
		public string Status { get; set; } = "Applied";
		public DateOnly AppliedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
		public string? Notes { get; set; }
	}

}