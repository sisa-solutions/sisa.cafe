/* eslint-disable */

export const protobufPackage = "sisa.grpc.enums";

export enum Combinator {
  COMBINATOR_UNSPECIFIED = 0,
  COMBINATOR_AND = 1,
  COMBINATOR_OR = 2,
  UNRECOGNIZED = -1,
}

export function combinatorFromJSON(object: any): Combinator {
  switch (object) {
    case 0:
    case "COMBINATOR_UNSPECIFIED":
      return Combinator.COMBINATOR_UNSPECIFIED;
    case 1:
    case "COMBINATOR_AND":
      return Combinator.COMBINATOR_AND;
    case 2:
    case "COMBINATOR_OR":
      return Combinator.COMBINATOR_OR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Combinator.UNRECOGNIZED;
  }
}

export function combinatorToJSON(object: Combinator): string {
  switch (object) {
    case Combinator.COMBINATOR_UNSPECIFIED:
      return "COMBINATOR_UNSPECIFIED";
    case Combinator.COMBINATOR_AND:
      return "COMBINATOR_AND";
    case Combinator.COMBINATOR_OR:
      return "COMBINATOR_OR";
    case Combinator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
