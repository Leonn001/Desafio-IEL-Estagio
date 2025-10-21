using IelChallengeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IelChallengeApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Estudante> Estudantes { get; set; }
    }
}