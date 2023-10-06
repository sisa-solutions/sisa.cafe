using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sisa.Blog.DbMigrator.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class AddPostCountToTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "post_count",
                table: "tags",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "post_count",
                table: "tags");
        }
    }
}
