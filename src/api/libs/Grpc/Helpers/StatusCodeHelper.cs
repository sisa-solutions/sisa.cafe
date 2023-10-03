using GrpcStatusCode = Grpc.Core.StatusCode;

namespace Sisa.Grpc.Helpers;

public static partial class StatusCodeHelper
{
    public static GrpcStatusCode ToGrpcStatusCode(this StatusCode statusCode)
    {
        return statusCode switch
        {
            StatusCode.BAD_REQUEST => GrpcStatusCode.InvalidArgument,
            StatusCode.UNAUTHORIZED => GrpcStatusCode.Unauthenticated,
            StatusCode.PAYMENT_REQUIRED => GrpcStatusCode.PermissionDenied,
            StatusCode.FORBIDDEN => GrpcStatusCode.PermissionDenied,
            StatusCode.NOT_FOUND => GrpcStatusCode.NotFound,
            StatusCode.CONFLICT => GrpcStatusCode.AlreadyExists,
            StatusCode.INTERNAL_SERVER_ERROR => GrpcStatusCode.Internal,
            _ => GrpcStatusCode.Unknown,
        };
    }

    public static GrpcStatusCode ToGrpcStatusCode(this IDomainException domainException)
    {
        return domainException.StatusCode.ToGrpcStatusCode();
    }
}
