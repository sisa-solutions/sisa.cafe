using FluentValidation;

using Sisa.Abstractions;

using Sisa.Blog.Api.V1.Files.Responses;
using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Blog.Domain.AggregatesModel.FileAggregate;

namespace Sisa.Blog.Api.V1.Files.Queries;

public sealed partial class FindFileByIdQuery : IQuery<SingleFileResponse>
{
    public Guid ParsedId
        => Guid.TryParse(Id, out var id) ? id : Guid.Empty;
}

public sealed class FindFileByIdQueryValidator : AbstractValidator<FindFileByIdQuery>
{
    public FindFileByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .Must((x, _) => x.ParsedId != Guid.Empty)
                .WithMessage("Invalid Id");
    }
}

public class FindFileByIdQueryHandler(
    IFileRepository repository,
    ILogger<FindFileByIdQueryHandler> logger
) : IQueryHandler<FindFileByIdQuery, SingleFileResponse>
{
    public async ValueTask<SingleFileResponse> HandleAsync(FindFileByIdQuery query, CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Finding file by id {Id}", query.Id);

        var file = await repository.FindAsync(
            x => x.Id == query.ParsedId
            , FileProjections.Projection
            , cancellationToken
        );

        if (file is null)
        {
            logger.LogError("File with id {Id} not found", query.Id);

            throw new Exception("File not found");
        }

        return file.ToSingleResponse();
    }
}
