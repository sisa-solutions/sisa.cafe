using FluentValidation;

using Sisa.Abstractions;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;

namespace Sisa.Blog.Api.V1.Posts.Commands;

public sealed partial class UpdatePostCommand : ICommand<SinglePostResponse>
{
    public Guid ParsedId => Guid.TryParse(Id, out Guid id) ? id : Guid.Empty;

    public Guid ParsedCategoryId => Guid.TryParse(CategoryId, out Guid id) ? id : Guid.Empty;
}

public sealed class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommand>
{
    public UpdatePostCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .Must((x, _) => x.ParsedCategoryId != Guid.Empty)
                .WithMessage("Invalid Category Id");

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

public class UpdatePostCommandHandler(
    IPostRepository repository,
    ICategoryRepository categoryRepository,
    ITagRepository tagRepository,
    ILogger<UpdatePostCommandHandler> logger
) : ICommandHandler<UpdatePostCommand, SinglePostResponse>
{
    public async ValueTask<SinglePostResponse> HandleAsync(UpdatePostCommand command, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Update Post with name {slug}", command.Slug);

        Post? post = await repository
            .FindAsync(command.Id, cancellationToken);

        if (post is null)
        {
            logger.LogWarning("Post with id {id} not found", command.Id);

            throw new Exception($"Post with id {command.Id} not found");
        }

        post.Update(
            command.Title,
            command.Slug,
            command.Excerpt,
            command.Content
        );

        if (Guid.TryParse(command.CategoryId, out Guid categoryId) && categoryId != post.CategoryId)
        {
            var categoryExists = await categoryRepository
                .ExistAsync(x => x.Id == categoryId, cancellationToken);

            if (!categoryExists)
            {
                logger.LogWarning("Category with id {id} not found", categoryId);

                throw new Exception($"Category with id {categoryId} not found");
            }

            post.ChangeCategory(categoryId);
        }

        // To associate tag slugs to post
        // we need to get the list of existings tags by slug
        // We also need to get the list of non existing tags
        // Then we need to check in the existing tags, which ones already associated to the post
        // and which ones are not
        // Then we need to add the non existing tags to database then associate them to the post
        // We also need to remove the tags that are not associated anymore to the post

        IEnumerable<Tag> existingTags = await tagRepository
            .GetAsync(x => command.Tags.Contains(x.Slug), cancellationToken);

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

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return post.MapToResponse();
    }
}

