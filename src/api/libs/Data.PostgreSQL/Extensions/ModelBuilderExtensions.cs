using Microsoft.EntityFrameworkCore;

namespace Sisa.Extensions;

public static class ModelBuilderExtensions
{
    public static void ConfigureExtensions(this ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("unaccent");
    }
}
