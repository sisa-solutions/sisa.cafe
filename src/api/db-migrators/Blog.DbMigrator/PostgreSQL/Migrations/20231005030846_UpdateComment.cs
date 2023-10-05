using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

#nullable disable

namespace Sisa.Blog.DbMigrator.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "comment_count",
                table: "posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "reaction_count",
                table: "posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Dictionary<ReactionType, int>>(
                name: "reaction_counts",
                table: "posts",
                type: "jsonb",
                nullable: false,
                defaultValueSql: "'[]'");

            migrationBuilder.AddColumn<int>(
                name: "view_count",
                table: "posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "comment_count",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "level",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "reaction_count",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Dictionary<ReactionType, int>>(
                name: "reaction_counts",
                table: "comments",
                type: "jsonb",
                nullable: false,
                defaultValueSql: "'[]'");

            migrationBuilder.AddColumn<int>(
                name: "view_count",
                table: "comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comment_count",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "reaction_count",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "reaction_counts",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "view_count",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "comment_count",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "level",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "reaction_count",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "reaction_counts",
                table: "comments");

            migrationBuilder.DropColumn(
                name: "view_count",
                table: "comments");
        }
    }
}
