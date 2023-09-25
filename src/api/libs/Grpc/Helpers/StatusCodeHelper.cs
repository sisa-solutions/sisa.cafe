using GrpcStatusCode = Grpc.Core.StatusCode;

namespace Sisa.Grpc.Helpers;

public static partial class StatusCodeHelper
{
    public static GrpcStatusCode ToGrpcStatusCode(this System.StatusCode statusCode)
    {
        return statusCode switch
        {
            System.StatusCode.BAD_REQUEST => GrpcStatusCode.InvalidArgument,
            System.StatusCode.UNAUTHORIZED => GrpcStatusCode.Unauthenticated,
            System.StatusCode.PAYMENT_REQUIRED => GrpcStatusCode.PermissionDenied,
            System.StatusCode.FORBIDDEN => GrpcStatusCode.PermissionDenied,
            System.StatusCode.NOT_FOUND => GrpcStatusCode.NotFound,
            System.StatusCode.CONFLICT => GrpcStatusCode.AlreadyExists,
            System.StatusCode.INTERNAL_SERVER_ERROR => GrpcStatusCode.Internal,
            _ => GrpcStatusCode.Unknown,
        };
    }

    public static GrpcStatusCode ToGrpcStatusCode(this IDomainException domainException)
    {
        return domainException.StatusCode.ToGrpcStatusCode();
    }
}
