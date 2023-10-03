using Sisa.Enums;

namespace Sisa.Abstractions;

public interface IFilterRule
{
    string Field { get; }
    string Value { get; }

    Operator Operator { get; }

    bool Not { get; }

    Combinator Combinator { get; }

    IEnumerable<IFilterRule> Rules { get; }
}

public interface IFilteringParams
{
    bool Not { get; }

    Combinator Combinator { get; }

    IEnumerable<IFilterRule> Rules { get; }
}
