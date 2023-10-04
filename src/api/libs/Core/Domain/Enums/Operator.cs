namespace Sisa.Enums;

public enum Operator
{
    Unspecified = 0, // unknown
    Equal = 1, // ==
    NotEqual = 2, // !=
    GreaterThan = 3, // >
    GreaterThanOrEqual = 4, // >=
    LessThan = 5, // <
    LessThanOrEqual = 6, // <=
    Contains = 7, // contains
    NotContains = 8, // not contains
    StartsWith = 9, // starts with
    NotStartsWith = 10, // not starts with
    EndsWith = 11, // ends with
    NotEndsWith = 12, // not ends with
    In = 13, // in
    NotIn = 14, // not in
    Between = 15, // between
    NotBetween = 16, // not between
    IsNull = 17, // is null
    IsNotNull = 18, // is not null
}
