
using Sisa.Abstractions;
using Sisa.Enums;

namespace Sisa.Data;

public class SortingParams : ISortingParams
{
    public string Field { get; set; } = string.Empty;

    public SortDirection Direction { get; set; } = SortDirection.ASC;
}
