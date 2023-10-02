using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Api.V1.Posts.Responses;

using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class CreatePostCommand : ICommand<SinglePostResponse>
{
}

public sealed class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Excerpt)
            .NotEmpty()
            .MaximumLength(250);

        RuleFor(x => x.Excerpt)
            .NotEmpty()
            .MaximumLength(short.MaxValue);
    }
}

public class CreatePostCommandHandler(
    IPostRepository repository,
    ICategoryRepository categoryRepository,
    ITagRepository tagRepository,
    ILogger<CreatePostCommandHandler> logger
) : ICommandHandler<CreatePostCommand, SinglePostResponse>
{
    public async ValueTask<SinglePostResponse> HandleAsync(CreatePostCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Creating Post with name {slug}", command.Slug);

        bool postExists = await repository
            .ExistAsync(x => x.Slug == command.Slug, cancellationToken);

        if (postExists)
        {
            logger.LogWarning("Post with name {slug} already exists", command.Slug);

            throw new DomainException(
                StatusCode.CONFLICT,
                "400",
                $"Post with name {command.Slug} already exists"
            );
        }

        if (!Guid.TryParse(command.CategoryId, out Guid categoryId))
        {
            logger.LogWarning("Category with id {id} not found", command.CategoryId);

            throw new Exception($"Category with id {command.CategoryId} not found");
        }

        var category = await categoryRepository
            .FindAsync(categoryId, cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", categoryId);

            throw new Exception($"Category with id {categoryId} not found");
        }

        var post = new Post(
            command.Title,
            command.Slug,
            command.Excerpt,
            command.Content
        );

        post.AssociateCategory(category);

        // To associate tag slugs to post
        // we need to get the list of existings tags by slug
        // We also need to get the list of non existing tags
        // Then we need to check in the existing tags, which ones already associated to the post
        // and which ones are not
        // Then we need to add the non existing tags to database then associate them to the post
        // We also need to remove the tags that are not associated anymore to the post

        IEnumerable<Tag> existingTags = await tagRepository
            .GetExistingTagsBySlugsAsync(command.Tags, cancellationToken);

        IEnumerable<string> nonExistingTags = command.Tags
            .Where(x => !existingTags.Any(y => y.Slug == x));

        IEnumerable<Tag> nonExistingTagsEntities = nonExistingTags
            .Select(x => new Tag(x, x));

        // await tagRepository.AddRangeAsync(nonExistingTagsEntities, cancellationToken);

        IEnumerable<Tag> tagsToAssociate = existingTags
            .Where(x => !post.Tags.Any(y => y.Id == x.Id))
            .Union(nonExistingTagsEntities);

        List<Tag> tagsToRemove = post.Tags
            .Where(x => !command.Tags.Contains(x.Slug))
            .ToList();

        post.RemoveTags(tagsToRemove);
        post.AddTags(tagsToAssociate);

        repository.Add(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        var response = post.MapToResponse();

        response.Value.Tags.AddRange(post.TagSlugs);

        return  response;
    }
}
