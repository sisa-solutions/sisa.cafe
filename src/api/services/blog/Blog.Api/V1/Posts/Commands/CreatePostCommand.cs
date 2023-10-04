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
    public Guid ParsedCategoryId => Guid.TryParse(CategoryId, out Guid id) ? id : Guid.Empty;
}

public sealed class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidator()
    {
        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .Must((x, _) => x.ParsedCategoryId != Guid.Empty)
                .WithMessage("Invalid CategoryId");

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
            logger.LogWarning("Post with slug {slug} already exists", command.Slug);

            throw new DomainException(
                StatusCode.CONFLICT,
                "400",
                $"Post with slug {command.Slug} already exists"
            );
        }

        var category = await categoryRepository
            .FindAsync(command.ParsedCategoryId, cancellationToken);

        if (category is null)
        {
            logger.LogWarning("Category with id {id} not found", command.CategoryId);

            throw new Exception($"Category with id {command.CategoryId} not found");
        }

        var post = new Post(
            command.Title,
            command.Slug,
            command.Excerpt,
            command.Content
        );

        post.AssociateCategory(category);

        IEnumerable<Tag> existingTags = await tagRepository
            .GetAsync(x => command.Tags.Contains(x.Slug), cancellationToken);

        IEnumerable<string> existingTagSlugs = existingTags
            .Select(x => x.Slug);

        IEnumerable<string> nonExistingTagSlugs = command.Tags
            .Except(existingTagSlugs);

        IEnumerable<Tag> nonExistingTagsEntities = nonExistingTagSlugs
            .Select(x => new Tag(x, x));

        IEnumerable<Tag> tagsToAssociate = existingTags
            .Union(nonExistingTagsEntities);

        post.AddTags(tagsToAssociate);

        repository.Add(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        var response = post.MapToResponse();

        return response;
    }
}
