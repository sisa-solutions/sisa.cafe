using FluentValidation;

using Sisa.Abstractions;
using Sisa.Blog.Api.V1.Posts.Responses;
using Sisa.Blog.Api.V1.Tags.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.PostAggregate;
using Sisa.Blog.Domain.AggregatesModel.TagAggregate;
using Sisa.Blog.Domain.Specifications;

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

        var spec = new PostSpecification(command.ParsedId);

        Post? post = await repository
            .FindAsync(spec, cancellationToken);

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
            var category = await categoryRepository
                .FindAsync(categoryId, cancellationToken);

            if (category == null)
            {
                logger.LogWarning("Category with id {id} not found", categoryId);

                throw new Exception($"Category with id {categoryId} not found");
            }

            post.ChangeCategory(category);
        }

        IEnumerable<Tag> existingTags = await tagRepository
            .GetAsync(x => command.TagSlugs.Contains(x.Slug), cancellationToken);

        var requestTags = command.TagSlugs
            .Select(tag => existingTags.FirstOrDefault(x => x.Slug == tag) ?? new Tag(tag, tag));

        post.UpdateTags(requestTags);

        repository.Update(post);

        await repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return post.MapToResponse();
    }
}

