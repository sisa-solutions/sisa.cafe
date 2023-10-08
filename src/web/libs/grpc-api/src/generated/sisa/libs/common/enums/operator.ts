/* eslint-disable */

export const protobufPackage = "sisa.grpc.enums";

/** shorthand for comparison operators */
export enum Operator {
  /** OPERATOR_UNSPECIFIED - unknown */
  OPERATOR_UNSPECIFIED = 0,
  /** OPERATOR_EQUAL - == */
  OPERATOR_EQUAL = 1,
  /** OPERATOR_NOT_EQUAL - != */
  OPERATOR_NOT_EQUAL = 2,
  /** OPERATOR_GREATER_THAN - > */
  OPERATOR_GREATER_THAN = 3,
  /** OPERATOR_GREATER_THAN_OR_EQUAL - >= */
  OPERATOR_GREATER_THAN_OR_EQUAL = 4,
  /** OPERATOR_LESS_THAN - < */
  OPERATOR_LESS_THAN = 5,
  /** OPERATOR_LESS_THAN_OR_EQUAL - <= */
  OPERATOR_LESS_THAN_OR_EQUAL = 6,
  /** OPERATOR_CONTAINS - contains */
  OPERATOR_CONTAINS = 7,
  /** OPERATOR_NOT_CONTAINS - not contains */
  OPERATOR_NOT_CONTAINS = 8,
  /** OPERATOR_STARTS_WITH - starts with */
  OPERATOR_STARTS_WITH = 9,
  /** OPERATOR_NOT_STARTS_WITH - not starts with */
  OPERATOR_NOT_STARTS_WITH = 10,
  /** OPERATOR_ENDS_WITH - ends with */
  OPERATOR_ENDS_WITH = 11,
  /** OPERATOR_NOT_ENDS_WITH - not ends with */
  OPERATOR_NOT_ENDS_WITH = 12,
  /** OPERATOR_IN - in */
  OPERATOR_IN = 13,
  /** OPERATOR_NOT_IN - not in */
  OPERATOR_NOT_IN = 14,
  /** OPERATOR_BETWEEN - between */
  OPERATOR_BETWEEN = 15,
  /** OPERATOR_NOT_BETWEEN - not between */
  OPERATOR_NOT_BETWEEN = 16,
  /** OPERATOR_IS_NULL - is null */
  OPERATOR_IS_NULL = 17,
  /** OPERATOR_IS_NOT_NULL - is not null */
  OPERATOR_IS_NOT_NULL = 18,
  UNRECOGNIZED = -1,
}

export function operatorFromJSON(object: any): Operator {
  switch (object) {
    case 0:
    case "OPERATOR_UNSPECIFIED":
      return Operator.OPERATOR_UNSPECIFIED;
    case 1:
    case "OPERATOR_EQUAL":
      return Operator.OPERATOR_EQUAL;
    case 2:
    case "OPERATOR_NOT_EQUAL":
      return Operator.OPERATOR_NOT_EQUAL;
    case 3:
    case "OPERATOR_GREATER_THAN":
      return Operator.OPERATOR_GREATER_THAN;
    case 4:
    case "OPERATOR_GREATER_THAN_OR_EQUAL":
      return Operator.OPERATOR_GREATER_THAN_OR_EQUAL;
    case 5:
    case "OPERATOR_LESS_THAN":
      return Operator.OPERATOR_LESS_THAN;
    case 6:
    case "OPERATOR_LESS_THAN_OR_EQUAL":
      return Operator.OPERATOR_LESS_THAN_OR_EQUAL;
    case 7:
    case "OPERATOR_CONTAINS":
      return Operator.OPERATOR_CONTAINS;
    case 8:
    case "OPERATOR_NOT_CONTAINS":
      return Operator.OPERATOR_NOT_CONTAINS;
    case 9:
    case "OPERATOR_STARTS_WITH":
      return Operator.OPERATOR_STARTS_WITH;
    case 10:
    case "OPERATOR_NOT_STARTS_WITH":
      return Operator.OPERATOR_NOT_STARTS_WITH;
    case 11:
    case "OPERATOR_ENDS_WITH":
      return Operator.OPERATOR_ENDS_WITH;
    case 12:
    case "OPERATOR_NOT_ENDS_WITH":
      return Operator.OPERATOR_NOT_ENDS_WITH;
    case 13:
    case "OPERATOR_IN":
      return Operator.OPERATOR_IN;
    case 14:
    case "OPERATOR_NOT_IN":
      return Operator.OPERATOR_NOT_IN;
    case 15:
    case "OPERATOR_BETWEEN":
      return Operator.OPERATOR_BETWEEN;
    case 16:
    case "OPERATOR_NOT_BETWEEN":
      return Operator.OPERATOR_NOT_BETWEEN;
    case 17:
    case "OPERATOR_IS_NULL":
      return Operator.OPERATOR_IS_NULL;
    case 18:
    case "OPERATOR_IS_NOT_NULL":
      return Operator.OPERATOR_IS_NOT_NULL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Operator.UNRECOGNIZED;
  }
}

export function operatorToJSON(object: Operator): string {
  switch (object) {
    case Operator.OPERATOR_UNSPECIFIED:
      return "OPERATOR_UNSPECIFIED";
    case Operator.OPERATOR_EQUAL:
      return "OPERATOR_EQUAL";
    case Operator.OPERATOR_NOT_EQUAL:
      return "OPERATOR_NOT_EQUAL";
    case Operator.OPERATOR_GREATER_THAN:
      return "OPERATOR_GREATER_THAN";
    case Operator.OPERATOR_GREATER_THAN_OR_EQUAL:
      return "OPERATOR_GREATER_THAN_OR_EQUAL";
    case Operator.OPERATOR_LESS_THAN:
      return "OPERATOR_LESS_THAN";
    case Operator.OPERATOR_LESS_THAN_OR_EQUAL:
      return "OPERATOR_LESS_THAN_OR_EQUAL";
    case Operator.OPERATOR_CONTAINS:
      return "OPERATOR_CONTAINS";
    case Operator.OPERATOR_NOT_CONTAINS:
      return "OPERATOR_NOT_CONTAINS";
    case Operator.OPERATOR_STARTS_WITH:
      return "OPERATOR_STARTS_WITH";
    case Operator.OPERATOR_NOT_STARTS_WITH:
      return "OPERATOR_NOT_STARTS_WITH";
    case Operator.OPERATOR_ENDS_WITH:
      return "OPERATOR_ENDS_WITH";
    case Operator.OPERATOR_NOT_ENDS_WITH:
      return "OPERATOR_NOT_ENDS_WITH";
    case Operator.OPERATOR_IN:
      return "OPERATOR_IN";
    case Operator.OPERATOR_NOT_IN:
      return "OPERATOR_NOT_IN";
    case Operator.OPERATOR_BETWEEN:
      return "OPERATOR_BETWEEN";
    case Operator.OPERATOR_NOT_BETWEEN:
      return "OPERATOR_NOT_BETWEEN";
    case Operator.OPERATOR_IS_NULL:
      return "OPERATOR_IS_NULL";
    case Operator.OPERATOR_IS_NOT_NULL:
      return "OPERATOR_IS_NOT_NULL";
    case Operator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
