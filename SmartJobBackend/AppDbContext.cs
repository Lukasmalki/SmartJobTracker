using SmartJobBackend.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SmartJobBackend
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


		public DbSet<JobApplication> JobApplications { get; set; }
	}
}
