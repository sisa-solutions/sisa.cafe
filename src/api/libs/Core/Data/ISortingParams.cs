using Sisa.Enums;

namespace Sisa.Abstractions;

public interface ISortingParams
{
    string Field { get; }
    SortDirection Direction { get; }
}
