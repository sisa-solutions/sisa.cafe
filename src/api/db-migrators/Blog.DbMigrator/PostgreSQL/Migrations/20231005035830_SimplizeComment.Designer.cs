﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Sisa.Blog.Data;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.ReactionAggregate;

#nullable disable

namespace Sisa.Blog.DbMigrator.PostgreSQL.Migrations
{
    [DbContext(typeof(BlogDbContext))]
    [Migration("20231005035830_SimplizeComment")]
    partial class SimplizeComment
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-rc.1.23419.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "unaccent");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.DataProtection.EntityFrameworkCore.DataProtectionKey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FriendlyName")
                        .HasColumnType("text")
                        .HasColumnName("friendly_name");

                    b.Property<string>("Xml")
                        .HasColumnType("text")
                        .HasColumnName("xml");

                    b.HasKey("Id")
                        .HasName("pk_data_protection_keys");

                    b.ToTable("data_protection_keys");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CategoryAggregate.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTimeOffset?>("DeletedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deleted_at");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("deleted_by");

                    b.Property<string>("Description")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("description")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Name")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("name")
                        .HasDefaultValueSql("''");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid")
                        .HasColumnName("parent_id");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("slug")
                        .HasDefaultValueSql("''");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("updated_by");

                    b.HasKey("Id")
                        .HasName("pk_categories");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_categories_parent_id");

                    b.HasIndex("Slug")
                        .HasDatabaseName("ix_categories_slug");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CommentAggregate.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Content")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)")
                        .HasColumnName("content")
                        .HasDefaultValueSql("''");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTimeOffset?>("DeletedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deleted_at");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("deleted_by");

                    b.Property<int>("Level")
                        .HasColumnType("integer")
                        .HasColumnName("level");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid")
                        .HasColumnName("parent_id");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid")
                        .HasColumnName("post_id");

                    b.Property<int>("ReactionCount")
                        .HasColumnType("integer")
                        .HasColumnName("reaction_count");

                    b.Property<Dictionary<ReactionType, int>>("ReactionCounts")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("reaction_counts")
                        .HasDefaultValueSql("'[]'");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("updated_by");

                    b.HasKey("Id")
                        .HasName("pk_comments");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_comments_parent_id");

                    b.HasIndex("PostId")
                        .HasDatabaseName("ix_comments_post_id");

                    b.ToTable("comments");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid")
                        .HasColumnName("category_id");

                    b.Property<int>("CommentCount")
                        .HasColumnType("integer")
                        .HasColumnName("comment_count");

                    b.Property<string>("Content")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(5000)
                        .HasColumnType("character varying(5000)")
                        .HasColumnName("content")
                        .HasDefaultValueSql("''");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTimeOffset?>("DeletedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deleted_at");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("deleted_by");

                    b.Property<string>("Excerpt")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("excerpt")
                        .HasDefaultValueSql("''");

                    b.Property<int>("ReactionCount")
                        .HasColumnType("integer")
                        .HasColumnName("reaction_count");

                    b.Property<Dictionary<ReactionType, int>>("ReactionCounts")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("reaction_counts")
                        .HasDefaultValueSql("'[]'");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("slug")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Status")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("status")
                        .HasDefaultValueSql("'DRAFT'");

                    b.Property<IReadOnlyCollection<PostStatusHistory>>("StatusHistories")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("status_histories")
                        .HasDefaultValueSql("'[]'");

                    b.Property<IReadOnlyCollection<string>>("TagSlugs")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("tag_slugs")
                        .HasDefaultValueSql("'[]'");

                    b.Property<string>("Title")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("title")
                        .HasDefaultValueSql("''");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("updated_by");

                    b.Property<int>("ViewCount")
                        .HasColumnType("integer")
                        .HasColumnName("view_count");

                    b.HasKey("Id")
                        .HasName("pk_posts");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_posts_category_id");

                    b.HasIndex("Slug")
                        .HasDatabaseName("ix_posts_slug");

                    b.ToTable("posts");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.PostAggregate.PostTag", b =>
                {
                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid")
                        .HasColumnName("post_id");

                    b.Property<Guid>("TagId")
                        .HasColumnType("uuid")
                        .HasColumnName("tag_id");

                    b.HasKey("PostId", "TagId")
                        .HasName("pk_post_tags");

                    b.HasIndex("PostId")
                        .HasDatabaseName("ix_post_tags_post_id");

                    b.HasIndex("TagId")
                        .HasDatabaseName("ix_post_tags_tag_id");

                    b.ToTable("post_tags");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.ReactionAggregate.CommentReaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<Guid>("CommentId")
                        .HasColumnType("uuid")
                        .HasColumnName("comment_id");

                    b.Property<IReadOnlyCollection<Reaction>>("Reactions")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("reactions")
                        .HasDefaultValueSql("'[]'");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_comment_reactions");

                    b.HasIndex("CommentId")
                        .HasDatabaseName("ix_comment_reactions_comment_id");

                    b.ToTable("comment_reactions");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.ReactionAggregate.PostReaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid")
                        .HasColumnName("post_id");

                    b.Property<IReadOnlyCollection<Reaction>>("Reactions")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("jsonb")
                        .HasColumnName("reactions")
                        .HasDefaultValueSql("'[]'");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_post_reactions");

                    b.HasIndex("PostId")
                        .HasDatabaseName("ix_post_reactions_post_id");

                    b.ToTable("post_reactions");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.TagAggregate.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTimeOffset?>("DeletedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deleted_at");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("deleted_by");

                    b.Property<string>("Description")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("description")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Name")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("slug")
                        .HasDefaultValueSql("''");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("updated_by");

                    b.HasKey("Id")
                        .HasName("pk_tags");

                    b.HasIndex("Slug")
                        .HasDatabaseName("ix_tags_slug");

                    b.ToTable("tags");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CategoryAggregate.Category", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.CategoryAggregate.Category", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("fk_categories_categories_parent_id");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CommentAggregate.Comment", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.CommentAggregate.Comment", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("fk_comments_comments_parent_id");

                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", "Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_comments_posts_post_id");

                    b.Navigation("Parent");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.CategoryAggregate.Category", "Category")
                        .WithMany("Posts")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_posts_categories_category_id");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.PostAggregate.PostTag", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", "Post")
                        .WithMany("PostTags")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_post_tags_posts_post_id");

                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.TagAggregate.Tag", "Tag")
                        .WithMany("PostTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_post_tags_tags_tag_id");

                    b.Navigation("Post");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.ReactionAggregate.CommentReaction", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.CommentAggregate.Comment", "Comment")
                        .WithMany("Reactions")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_comment_reactions_comments_comment_id");

                    b.Navigation("Comment");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.ReactionAggregate.PostReaction", b =>
                {
                    b.HasOne("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", "Post")
                        .WithMany("Reactions")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_post_reactions_posts_post_id");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CategoryAggregate.Category", b =>
                {
                    b.Navigation("Children");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.CommentAggregate.Comment", b =>
                {
                    b.Navigation("Children");

                    b.Navigation("Reactions");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.PostAggregate.Post", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("PostTags");

                    b.Navigation("Reactions");
                });

            modelBuilder.Entity("Sisa.Blog.Domain.AggregatesModel.TagAggregate.Tag", b =>
                {
                    b.Navigation("PostTags");
                });
#pragma warning restore 612, 618
        }
    }
}
