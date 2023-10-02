namespace Sisa.Enums;

public enum Operator
{
    UNKNOWN = 0, // unknown
    EQUAL = 1, // ==
    NOT_EQUAL = 2, // !=
    GREATER_THAN = 3, // >
    GREATER_THAN_OR_EQUAL = 4, // >=
    LESS_THAN = 5, // <
    LESS_THAN_OR_EQUAL = 6, // <=
    CONTAINS = 7, // contains
    NOT_CONTAINS = 8, // not contains
    STARTS_WITH = 9, // starts with
    NOT_STARTS_WITH = 10, // not starts with
    ENDS_WITH = 11, // ends with
    NOT_ENDS_WITH = 12, // not ends with
    IN = 13, // in
    NOT_IN = 14, // not in
    BETWEEN = 15, // between
    NOT_BETWEEN = 16, // not between
}
