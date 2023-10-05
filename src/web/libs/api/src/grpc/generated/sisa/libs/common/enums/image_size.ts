/* eslint-disable */

export const protobufPackage = "sisa.grpc.enums";

export enum ImageSize {
  IMAGE_SIZE_UNSPECIFIED = 0,
  IMAGE_SIZE_XS = 1,
  IMAGE_SIZE_SM = 2,
  IMAGE_SIZE_MD = 3,
  IMAGE_SIZE_LG = 5,
  IMAGE_SIZE_XL = 6,
  UNRECOGNIZED = -1,
}

export function imageSizeFromJSON(object: any): ImageSize {
  switch (object) {
    case 0:
    case "IMAGE_SIZE_UNSPECIFIED":
      return ImageSize.IMAGE_SIZE_UNSPECIFIED;
    case 1:
    case "IMAGE_SIZE_XS":
      return ImageSize.IMAGE_SIZE_XS;
    case 2:
    case "IMAGE_SIZE_SM":
      return ImageSize.IMAGE_SIZE_SM;
    case 3:
    case "IMAGE_SIZE_MD":
      return ImageSize.IMAGE_SIZE_MD;
    case 5:
    case "IMAGE_SIZE_LG":
      return ImageSize.IMAGE_SIZE_LG;
    case 6:
    case "IMAGE_SIZE_XL":
      return ImageSize.IMAGE_SIZE_XL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImageSize.UNRECOGNIZED;
  }
}

export function imageSizeToJSON(object: ImageSize): string {
  switch (object) {
    case ImageSize.IMAGE_SIZE_UNSPECIFIED:
      return "IMAGE_SIZE_UNSPECIFIED";
    case ImageSize.IMAGE_SIZE_XS:
      return "IMAGE_SIZE_XS";
    case ImageSize.IMAGE_SIZE_SM:
      return "IMAGE_SIZE_SM";
    case ImageSize.IMAGE_SIZE_MD:
      return "IMAGE_SIZE_MD";
    case ImageSize.IMAGE_SIZE_LG:
      return "IMAGE_SIZE_LG";
    case ImageSize.IMAGE_SIZE_XL:
      return "IMAGE_SIZE_XL";
    case ImageSize.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
