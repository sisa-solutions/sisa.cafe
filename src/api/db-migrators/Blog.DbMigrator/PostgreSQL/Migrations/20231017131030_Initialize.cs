using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

#nullable disable

namespace Sisa.Blog.DbMigrator.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class Initialize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:unaccent", ",,");

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "''"),
                    slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "''"),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValueSql: "''"),
                    created_by = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: true),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    deleted_by = table.Column<Guid>(type: "uuid", nullable: true),
                    deleted_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_categories", x => x.id);
                    table.ForeignKey(
                        name: "fk_categories_categories_parent_id",
                        column: x => x.parent_id,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "data_protection_keys",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    friendly_name = table.Column<string>(type: "text", nullable: true),
                    xml = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_data_protection_keys", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tags",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValueSql: "''"),
                    slug = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValueSql: "''"),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValueSql: "''"),
                    post_count = table.Column<int>(type: "integer", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: true),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    deleted_by = table.Column<Guid>(type: "uuid", nullable: true),
                    deleted_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tags", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "posts",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    category_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "''"),
                    slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValueSql: "''"),
                    excerpt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValueSql: "''"),
                    content = table.Column<string>(type: "character varying(10000)", maxLength: 10000, nullable: false, defaultValueSql: "''"),
                    status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValueSql: "'DRAFT'"),
                    view_count = table.Column<int>(type: "integer", nullable: false),
                    comment_count = table.Column<int>(type: "integer", nullable: false),
                    reaction_count = table.Column<int>(type: "integer", nullable: false),
                    reaction_counts = table.Column<IReadOnlyCollection<ReactionCounter>>(type: "jsonb", nullable: false, defaultValueSql: "'[]'"),
                    point = table.Column<int>(type: "integer", nullable: false),
                    status_histories = table.Column<IReadOnlyCollection<PostStatusHistory>>(type: "jsonb", nullable: false, defaultValueSql: "'[]'"),
                    tag_slugs = table.Column<List<string>>(type: "text[]", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: true),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    deleted_by = table.Column<Guid>(type: "uuid", nullable: true),
                    deleted_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_posts", x => x.id);
                    table.ForeignKey(
                        name: "fk_posts_categories_category_id",
                        column: x => x.category_id,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    post_id = table.Column<Guid>(type: "uuid", nullable: false),
                    content = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValueSql: "''"),
                    level = table.Column<int>(type: "integer", nullable: false),
                    view_count = table.Column<int>(type: "integer", nullable: false),
                    comment_count = table.Column<int>(type: "integer", nullable: false),
                    reaction_count = table.Column<int>(type: "integer", nullable: false),
                    reaction_counts = table.Column<IReadOnlyCollection<ReactionCounter>>(type: "jsonb", nullable: false, defaultValueSql: "'[]'"),
                    point = table.Column<int>(type: "integer", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: true),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    deleted_by = table.Column<Guid>(type: "uuid", nullable: true),
                    deleted_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_comments", x => x.id);
                    table.ForeignKey(
                        name: "fk_comments_comments_parent_id",
                        column: x => x.parent_id,
                        principalTable: "comments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_comments_posts_post_id",
                        column: x => x.post_id,
                        principalTable: "posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "post_reactions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    post_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    reactions = table.Column<IReadOnlyCollection<Reaction>>(type: "jsonb", nullable: false, defaultValueSql: "'[]'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_post_reactions", x => x.id);
                    table.ForeignKey(
                        name: "fk_post_reactions_posts_post_id",
                        column: x => x.post_id,
                        principalTable: "posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "post_tags",
                columns: table => new
                {
                    post_id = table.Column<Guid>(type: "uuid", nullable: false),
                    tag_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_post_tags", x => new { x.post_id, x.tag_id });
                    table.ForeignKey(
                        name: "fk_post_tags_posts_post_id",
                        column: x => x.post_id,
                        principalTable: "posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_post_tags_tags_tag_id",
                        column: x => x.tag_id,
                        principalTable: "tags",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "comment_reactions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    comment_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    reactions = table.Column<IReadOnlyCollection<Reaction>>(type: "jsonb", nullable: false, defaultValueSql: "'[]'")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_comment_reactions", x => x.id);
                    table.ForeignKey(
                        name: "fk_comment_reactions_comments_comment_id",
                        column: x => x.comment_id,
                        principalTable: "comments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "ix_categories_parent_id",
                table: "categories",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_categories_slug",
                table: "categories",
                column: "slug")
                .Annotation("Npgsql:IndexInclude", new[] { "name" });

            migrationBuilder.CreateIndex(
                name: "ix_comment_reactions_comment_id",
                table: "comment_reactions",
                column: "comment_id");

            migrationBuilder.CreateIndex(
                name: "ix_comments_parent_id",
                table: "comments",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_comments_post_id",
                table: "comments",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "ix_post_reactions_post_id",
                table: "post_reactions",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "ix_post_tags_post_id",
                table: "post_tags",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "ix_post_tags_tag_id",
                table: "post_tags",
                column: "tag_id");

            migrationBuilder.CreateIndex(
                name: "ix_posts_category_id",
                table: "posts",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "ix_posts_slug",
                table: "posts",
                column: "slug")
                .Annotation("Npgsql:IndexInclude", new[] { "title" });

            migrationBuilder.CreateIndex(
                name: "ix_tags_slug",
                table: "tags",
                column: "slug")
                .Annotation("Npgsql:IndexInclude", new[] { "name" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment_reactions");

            migrationBuilder.DropTable(
                name: "data_protection_keys");

            migrationBuilder.DropTable(
                name: "post_reactions");

            migrationBuilder.DropTable(
                name: "post_tags");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "tags");

            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropTable(
                name: "categories");
        }
    }
}
