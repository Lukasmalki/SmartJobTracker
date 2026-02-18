namespace SmartJobBackend.DTOs
{
	public record JobApplicationResponse(
		Guid Id,
		string Company,
		string Role,
		string Status,
		DateOnly AppliedDate,
		string? Notes
	);
}
