/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Combinator, combinatorFromJSON, combinatorToJSON } from "../../common/enums/combinator";
import { Operator, operatorFromJSON, operatorToJSON } from "../../common/enums/operator";

export const protobufPackage = "sisa.data.params";

export interface FilterRule {
  not: boolean;
  combinator: Combinator;
  rules: FilterRule[];
  field: string;
  value: string;
  operator: Operator;
}

export interface FilteringParams {
  not: boolean;
  combinator: Combinator;
  rules: FilterRule[];
}

function createBaseFilterRule(): FilterRule {
  return { not: false, combinator: 0, rules: [], field: "", value: "", operator: 0 };
}

export const FilterRule = {
  encode(message: FilterRule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.not === true) {
      writer.uint32(8).bool(message.not);
    }
    if (message.combinator !== 0) {
      writer.uint32(16).int32(message.combinator);
    }
    for (const v of message.rules) {
      FilterRule.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.field !== "") {
      writer.uint32(34).string(message.field);
    }
    if (message.value !== "") {
      writer.uint32(42).string(message.value);
    }
    if (message.operator !== 0) {
      writer.uint32(48).int32(message.operator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterRule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.not = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.combinator = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rules.push(FilterRule.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.field = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.value = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilterRule {
    return {
      not: isSet(object.not) ? globalThis.Boolean(object.not) : false,
      combinator: isSet(object.combinator) ? combinatorFromJSON(object.combinator) : 0,
      rules: globalThis.Array.isArray(object?.rules) ? object.rules.map((e: any) => FilterRule.fromJSON(e)) : [],
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      operator: isSet(object.operator) ? operatorFromJSON(object.operator) : 0,
    };
  },

  toJSON(message: FilterRule): unknown {
    const obj: any = {};
    if (message.not === true) {
      obj.not = message.not;
    }
    if (message.combinator !== 0) {
      obj.combinator = combinatorToJSON(message.combinator);
    }
    if (message.rules?.length) {
      obj.rules = message.rules.map((e) => FilterRule.toJSON(e));
    }
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.operator !== 0) {
      obj.operator = operatorToJSON(message.operator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterRule>, I>>(base?: I): FilterRule {
    return FilterRule.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterRule>, I>>(object: I): FilterRule {
    const message = createBaseFilterRule();
    message.not = object.not ?? false;
    message.combinator = object.combinator ?? 0;
    message.rules = object.rules?.map((e) => FilterRule.fromPartial(e)) || [];
    message.field = object.field ?? "";
    message.value = object.value ?? "";
    message.operator = object.operator ?? 0;
    return message;
  },
};

function createBaseFilteringParams(): FilteringParams {
  return { not: false, combinator: 0, rules: [] };
}

export const FilteringParams = {
  encode(message: FilteringParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.not === true) {
      writer.uint32(8).bool(message.not);
    }
    if (message.combinator !== 0) {
      writer.uint32(16).int32(message.combinator);
    }
    for (const v of message.rules) {
      FilterRule.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilteringParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilteringParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.not = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.combinator = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rules.push(FilterRule.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilteringParams {
    return {
      not: isSet(object.not) ? globalThis.Boolean(object.not) : false,
      combinator: isSet(object.combinator) ? combinatorFromJSON(object.combinator) : 0,
      rules: globalThis.Array.isArray(object?.rules) ? object.rules.map((e: any) => FilterRule.fromJSON(e)) : [],
    };
  },

  toJSON(message: FilteringParams): unknown {
    const obj: any = {};
    if (message.not === true) {
      obj.not = message.not;
    }
    if (message.combinator !== 0) {
      obj.combinator = combinatorToJSON(message.combinator);
    }
    if (message.rules?.length) {
      obj.rules = message.rules.map((e) => FilterRule.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilteringParams>, I>>(base?: I): FilteringParams {
    return FilteringParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilteringParams>, I>>(object: I): FilteringParams {
    const message = createBaseFilteringParams();
    message.not = object.not ?? false;
    message.combinator = object.combinator ?? 0;
    message.rules = object.rules?.map((e) => FilterRule.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
