using Microsoft.EntityFrameworkCore;

public class CountriesDbContext : DbContext
{
    public CountriesDbContext(DbContextOptions<CountriesDbContext> options)
        : base(options) { }

    public DbSet<Country> Countries => Set<Country>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>(b =>
        {
            b.HasKey(c => c.Alpha3Code);
            b.OwnsOne(c => c.Flags);
        });
    }
}
