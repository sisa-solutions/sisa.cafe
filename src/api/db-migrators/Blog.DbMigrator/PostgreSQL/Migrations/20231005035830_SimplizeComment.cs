using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sisa.Blog.DbMigrator.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class SimplizeComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comment_count",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "view_count",
                table: "comments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "comment_count",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "view_count",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
