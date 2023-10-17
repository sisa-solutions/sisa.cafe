/* eslint-disable */

/** shorthand for comparison operators */
export enum Operator {
  /** UNSPECIFIED - unknown */
  UNSPECIFIED = 0,
  /** EQUAL - == */
  EQUAL = 1,
  /** NOT_EQUAL - != */
  NOT_EQUAL = 2,
  /** GREATER_THAN - > */
  GREATER_THAN = 3,
  /** GREATER_THAN_OR_EQUAL - >= */
  GREATER_THAN_OR_EQUAL = 4,
  /** LESS_THAN - < */
  LESS_THAN = 5,
  /** LESS_THAN_OR_EQUAL - <= */
  LESS_THAN_OR_EQUAL = 6,
  /** CONTAINS - contains */
  CONTAINS = 7,
  /** NOT_CONTAINS - not contains */
  NOT_CONTAINS = 8,
  /** STARTS_WITH - starts with */
  STARTS_WITH = 9,
  /** NOT_STARTS_WITH - not starts with */
  NOT_STARTS_WITH = 10,
  /** ENDS_WITH - ends with */
  ENDS_WITH = 11,
  /** NOT_ENDS_WITH - not ends with */
  NOT_ENDS_WITH = 12,
  /** IN - in */
  IN = 13,
  /** NOT_IN - not in */
  NOT_IN = 14,
  /** BETWEEN - between */
  BETWEEN = 15,
  /** NOT_BETWEEN - not between */
  NOT_BETWEEN = 16,
  /** IS_NULL - is null */
  IS_NULL = 17,
  /** IS_NOT_NULL - is not null */
  IS_NOT_NULL = 18,
}
