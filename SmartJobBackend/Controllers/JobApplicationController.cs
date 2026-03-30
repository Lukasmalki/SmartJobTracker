using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartJobBackend.DTOs;
using SmartJobBackend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmartJobBackend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class JobapplicationController : ControllerBase
	{
		private readonly AppDbContext _db;
		//private static readonly List<JobApplication> Applications = new();

		public JobapplicationController(AppDbContext db)
		{
			_db = db;
		}

		//GET
		[HttpGet]
		public async Task<ActionResult<IEnumerable<JobApplicationResponse>>> GetAll()
		{
			var result = await _db.JobApplications
				.Select(a => new JobApplicationResponse(
					a.Id, a.Company, a.Role, a.Status, a.AppliedDate, a.Notes
				))
				.ToListAsync();

			return Ok(result);
		}

		//POST
		[HttpPost]
		public async Task<ActionResult<JobApplicationResponse>> Create([FromBody] CreateJobApplicationRequest request)
		{
			var app = new JobApplication
			{
				Company = request.Company,
				Role = request.Role,
				AppliedDate = request.AppliedDate,
				Notes = request.Notes
			};

			_db.JobApplications.Add(app);
			await _db.SaveChangesAsync();

			var response = new JobApplicationResponse(
				app.Id, app.Company, app.Role, app.Status, app.AppliedDate, app.Notes
			);

			return CreatedAtAction(nameof(GetAll), new { id = app.Id }, response);
		}

		// PUT: api/jobapplication/{id}
		[HttpPut("{id}")]
		public async Task<ActionResult<JobApplicationResponse>> Update(Guid id, [FromBody] UpdateJobApplicationRequest request)
		{
			var app = await _db.JobApplications.FindAsync(id);

			if (app == null)
			{
				return NotFound($"No job application found with Id {id}");
			}

			// Uppdatera fälten
			app.Company = request.Company;
			app.Role = request.Role;
			app.AppliedDate = request.AppliedDate;
			app.Notes = request.Notes;

			await _db.SaveChangesAsync();

			var response = new JobApplicationResponse(
				app.Id, app.Company, app.Role, app.Status, app.AppliedDate, app.Notes
			);

			return Ok(response);
		}

		// DELETE: api/jobapplication/{id}
		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(Guid id)
		{
			var app = await _db.JobApplications.FindAsync(id);

			if (app == null)
			{
				return NotFound($"No job application found with Id {id}");
			}

			_db.JobApplications.Remove(app);
			await _db.SaveChangesAsync();

			return NoContent(); // 204 = lyckad borttagning utan body
		}


	}
}
