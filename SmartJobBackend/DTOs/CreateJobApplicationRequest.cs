namespace SmartJobBackend.DTOs
{
	public record CreateJobApplicationRequest(
		string Company,
		string Role,
		DateOnly AppliedDate,
        string? Notes = null
	);
}
