using System.Linq.Expressions;

using Sisa.Blog.Domain.AggregatesModel.CategoryAggregate;
using Sisa.Extensions;

namespace Sisa.Blog.Domain.Specifications;

public static partial class CategorySpecifications
{
    public static Expression<Func<Category, bool>> FilterByName(string? term)
    {
        if (string.IsNullOrWhiteSpace(term))
        {
            return x => true;
        }

        return x => x.Name.ILike($"%{term}%");
    }
}
