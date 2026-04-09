namespace SmartJobBackend.DTOs
{
	public record UpdateJobApplicationRequest(
		string Company,
		string Role,
		DateOnly AppliedDate,
		string? Notes = null,
		string Status = "Applied"
	);
}
