using Microsoft.AspNetCore.Mvc;
using SmartJobBackend.DTOs;
using SmartJobBackend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmartJobBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class JobapplicationController : ControllerBase
	{
		private static readonly List<JobApplication> Applications = new();

		//GET
		[HttpGet]
		public ActionResult<IEnumerable<JobApplicationResponse>> GetAll()
		{
			var result = Applications.Select(a => new JobApplicationResponse(
				a.Id, a.Company, a.Role, a.Status, a.AppliedDate, a.Notes
			));
			return Ok(result);
		}

		//POST
		[HttpPost]
		public ActionResult<JobApplicationResponse> Create([FromBody] CreateJobApplicationRequest request)
		{
			var app = new JobApplication
			{
				Company = request.Company,
				Role = request.Role,
				AppliedDate = request.AppliedDate,
				Notes = request.Notes
			};

			Applications.Add(app);

			var response = new JobApplicationResponse(
				app.Id, app.Company, app.Role, app.Status, app.AppliedDate, app.Notes
			);

			return CreatedAtAction(nameof(GetAll), new { id = app.Id }, response);
		}

		// PUT: api/jobapplication/{id}
		[HttpPut("{id}")]
		public ActionResult<JobApplicationResponse> Update(Guid id, [FromBody] UpdateJobApplicationRequest request)
		{
			var app = Applications.FirstOrDefault(a => a.Id == id);

			if (app == null)
			{
				return NotFound($"No job application found with Id {id}");
			}

			// Uppdatera fälten
			app.Company = request.Company;
			app.Role = request.Role;
			app.AppliedDate = request.AppliedDate;
			app.Notes = request.Notes;

			var response = new JobApplicationResponse(
				app.Id, app.Company, app.Role, app.Status, app.AppliedDate, app.Notes
			);

			return Ok(response);
		}

		// DELETE: api/jobapplication/{id}
		[HttpDelete("{id}")]
		public ActionResult Delete(Guid id)
		{
			var app = Applications.FirstOrDefault(a => a.Id == id);

			if (app == null)
			{
				return NotFound($"No job application found with Id {id}");
			}

			Applications.Remove(app);

			return NoContent(); // 204 = lyckad borttagning utan body
		}


	}
}
