/* eslint-disable */

export const protobufPackage = "sisa.grpc.enums";

export enum SortDirection {
  /** SORT_DIRECTION_UNSPECIFIED - unspecified */
  SORT_DIRECTION_UNSPECIFIED = 0,
  /** SORT_DIRECTION_ASC - ascending */
  SORT_DIRECTION_ASC = 1,
  /** SORT_DIRECTION_DESC - descending */
  SORT_DIRECTION_DESC = 2,
  UNRECOGNIZED = -1,
}

export function sortDirectionFromJSON(object: any): SortDirection {
  switch (object) {
    case 0:
    case "SORT_DIRECTION_UNSPECIFIED":
      return SortDirection.SORT_DIRECTION_UNSPECIFIED;
    case 1:
    case "SORT_DIRECTION_ASC":
      return SortDirection.SORT_DIRECTION_ASC;
    case 2:
    case "SORT_DIRECTION_DESC":
      return SortDirection.SORT_DIRECTION_DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SortDirection.UNRECOGNIZED;
  }
}

export function sortDirectionToJSON(object: SortDirection): string {
  switch (object) {
    case SortDirection.SORT_DIRECTION_UNSPECIFIED:
      return "SORT_DIRECTION_UNSPECIFIED";
    case SortDirection.SORT_DIRECTION_ASC:
      return "SORT_DIRECTION_ASC";
    case SortDirection.SORT_DIRECTION_DESC:
      return "SORT_DIRECTION_DESC";
    case SortDirection.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
