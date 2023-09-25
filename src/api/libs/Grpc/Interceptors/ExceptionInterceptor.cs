using FluentValidation;
using FluentValidation.Results;

using Grpc.Core;
using Grpc.Core.Interceptors;
using GrpcStatusCode = Grpc.Core.StatusCode;

using Microsoft.Extensions.Logging;

using Sisa.Grpc.Helpers;
using System.Text.Json;

namespace Sisa.Grpc.Interceptors;

public class ExceptionInterceptor : Interceptor
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ExceptionInterceptor> _logger;

    public ExceptionInterceptor(
        IServiceProvider serviceProvider,
        ILogger<ExceptionInterceptor> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public override TResponse BlockingUnaryCall<TRequest, TResponse>(
        TRequest request,
        ClientInterceptorContext<TRequest, TResponse> context,
        BlockingUnaryCallContinuation<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("Request: ({@request})", request);

        try
        {
            Validate(request);

            TResponse response = base.BlockingUnaryCall(request, context, continuation);

            // _logger.LogInformation("Response: ({@response})", response);

            return response;
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("Request: ({@request})", request);


        try
        {
            await ValidateAsync(request, context.CancellationToken);

            TResponse response = await continuation(request, context);

            // _logger.LogInformation("Response: ({@response})", response);

            return response;
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override AsyncUnaryCall<TResponse> AsyncUnaryCall<TRequest, TResponse>(
        TRequest request,
        ClientInterceptorContext<TRequest, TResponse> context,
        AsyncUnaryCallContinuation<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("Request: ({@request})", request);

        try
        {
            Validate(request);

            return base.AsyncUnaryCall(request, context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override async Task<TResponse> ClientStreamingServerHandler<TRequest, TResponse>(
        IAsyncStreamReader<TRequest> requestStream,
        ServerCallContext context,
        ClientStreamingServerMethod<TRequest, TResponse> continuation)
    {
        try
        {
            TResponse response = await base.ClientStreamingServerHandler(requestStream, context, continuation);

            // _logger.LogInformation("Response: ({@response})", response);

            return response;
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override AsyncClientStreamingCall<TRequest, TResponse> AsyncClientStreamingCall<TRequest, TResponse>(
        ClientInterceptorContext<TRequest, TResponse> context,
        AsyncClientStreamingCallContinuation<TRequest, TResponse> continuation)
    {
        try
        {
            return base.AsyncClientStreamingCall(context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override async Task ServerStreamingServerHandler<TRequest, TResponse>(
        TRequest request,
        IServerStreamWriter<TResponse> responseStream,
        ServerCallContext context,
        ServerStreamingServerMethod<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("Request: ({@request})", request);


        try
        {
            await ValidateAsync(request);

            await base.ServerStreamingServerHandler(request, responseStream, context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override AsyncServerStreamingCall<TResponse> AsyncServerStreamingCall<TRequest, TResponse>(
        TRequest request,
        ClientInterceptorContext<TRequest, TResponse> context,
        AsyncServerStreamingCallContinuation<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("Request: ({@request})", request);

        try
        {
            Validate(request);

            return base.AsyncServerStreamingCall(request, context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override Task DuplexStreamingServerHandler<TRequest, TResponse>(
        IAsyncStreamReader<TRequest> requestStream,
        IServerStreamWriter<TResponse> responseStream,
        ServerCallContext context,
        DuplexStreamingServerMethod<TRequest, TResponse> continuation)
    {
        try
        {
            return base.DuplexStreamingServerHandler(requestStream, responseStream, context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    public override AsyncDuplexStreamingCall<TRequest, TResponse> AsyncDuplexStreamingCall<TRequest, TResponse>(
        ClientInterceptorContext<TRequest, TResponse> context,
        AsyncDuplexStreamingCallContinuation<TRequest, TResponse> continuation)
    {
        try
        {
            return base.AsyncDuplexStreamingCall(context, continuation);
        }
        catch (Exception ex)
        {
            throw HandleException(ex);
        }
    }

    private void Validate<TRequest>(TRequest request)
    {
        IValidator<TRequest>? validator = _serviceProvider.GetService(typeof(IValidator<TRequest>)) as IValidator<TRequest>;

        if (validator is not null)
        {
            var validationResult = validator!.Validate(request);

            HandleValidationException(validationResult);
        }
    }

    private async Task ValidateAsync<TRequest>(TRequest request, CancellationToken cancellationToken = default)
    {
        IValidator<TRequest>? validator = _serviceProvider.GetService(typeof(IValidator<TRequest>)) as IValidator<TRequest>;

        if (validator is not null)
        {
            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            HandleValidationException(validationResult);
        }
    }

    private void HandleValidationException(ValidationResult validationResult)
    {
        if (validationResult.IsValid)
            return;

        _logger.LogWarning("Validation error: ({@validationResult})", validationResult);

        throw new DomainException(System.StatusCode.BAD_REQUEST, "400", "One or more validation errors occurred", validationResult.ToDictionary());
    }

    private RpcException HandleException(Exception ex)
    {
        _logger.LogError(ex, "Error processing request");

        if (ex is IDomainException domainException)
        {
            return new RpcException(
                new Status(domainException.ToGrpcStatusCode(), domainException.Message, ex),
                new Metadata
                {
                    { "x-error-code", domainException.ErrorCode },
                    { "x-errors", domainException.ErrorCode },
                }
            );
        }

        return new RpcException(
            new Status(GrpcStatusCode.Internal, "An error occurred while processing the request", ex),
            new Metadata
            {
                { "x-error-code", "500" },
            }
        );
    }
}


