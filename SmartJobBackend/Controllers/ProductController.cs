using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SmartJobBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		[Authorize]
		[HttpGet]
		public IActionResult GetProducts()
		{
			return Ok(new[] { "Product1", "Product2" });
		}
	}
}
