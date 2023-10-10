using System.Net;

using Amazon.S3;
using Amazon.S3.Model;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Sisa.Abstractions;
using Sisa.Infrastructure.Settings;


namespace Sisa.Infrastructure.Services;

/// <inheritdoc/>
public class FileStorageService(
    IAmazonS3 s3Client,
    IOptions<AwsSettings> options,
    ILogger<FileStorageService> logger
) : IFileStorageService
{
    private readonly IAmazonS3 _s3Client = s3Client;
    private readonly IOptions<AwsSettings> _options = options;
    private readonly ILogger<FileStorageService> _logger = logger;

    /// <inheritdoc/>
    public string GetPresignedUrl(string bucket, string filePath, TimeSpan? expiration)
    {
        _logger.LogInformation($"Getting Presigned URL for object from bucket {bucket} with file path {filePath}");

        var request = new GetPreSignedUrlRequest
        {
            BucketName = bucket,
            Key = filePath,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.Add(expiration ?? TimeSpan.FromMinutes(5))
        };

        string url = string.Empty;

        try
        {
            url = _s3Client.GetPreSignedURL(request);

            _logger.LogInformation($"Successfully got Presigned URL for object from bucket {bucket} with file path {filePath}");
        }
        catch (AmazonS3Exception ex)
        {
            _logger.LogError(ex, $"Failed to get Presigned URL for object from bucket {bucket} with file path {filePath}");
        }

        return url;
    }

    /// <inheritdoc/>
    public async ValueTask<Stream?> DownloadAsync(string bucket, string filePath, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation($"Downloading object from bucket {bucket} with file path {filePath}");

        var request = new GetObjectRequest
        {
            BucketName = bucket,
            Key = filePath
        };

        try
        {
            var response = await _s3Client.GetObjectAsync(request);
            if (response is not null && response.HttpStatusCode == HttpStatusCode.OK)
            {
                _logger.LogInformation($"Successfully downloaded object from bucket {bucket} with file path {filePath}");

                using var responseStream = new MemoryStream();
                await response.ResponseStream.CopyToAsync(responseStream, cancellationToken);
                responseStream.Seek(0, SeekOrigin.Begin);

                return responseStream;
            }

            _logger.LogError($"Failed to download object from bucket {bucket} with file path {filePath}");
        }
        catch (AmazonS3Exception ex)
        {
            _logger.LogError(ex, $"Failed to download object from bucket {bucket} with file path {filePath}");
        }

        return null;
    }

    /// <inheritdoc/>
    public async ValueTask<IUploadResponse> UploadAsync(
        string bucket, string path, string fileName,
        Stream stream, string? contentType, IDictionary<string, string>? tags,
        CancellationToken cancellationToken = default)
    {
        var currentDate = DateTime.UtcNow.Date;
        var filePath = $"{path}/{currentDate:yyyy}/{currentDate:MM}/{currentDate:dd}";
        var key = $"{filePath}/{fileName}";

        _logger.LogInformation($"Uploading object to bucket {bucket} with key {key}");

        var request = new PutObjectRequest
        {
            BucketName = bucket,
            Key = key,
            InputStream = stream,
            TagSet = [],
            DisablePayloadSigning = _options.Value.DisablePayloadSigning
        };

        if (!string.IsNullOrEmpty(request.ContentType))
            request.ContentType = contentType;

        if (tags is not null && tags.Any())
            request.TagSet.AddRange(tags.Select(x => new Tag { Key = x.Key, Value = x.Value }));

        try
        {
            var response = await _s3Client.PutObjectAsync(request);

            if (response is not null && response.HttpStatusCode == HttpStatusCode.OK)
            {
                _logger.LogInformation($"Successfully uploaded object to bucket {bucket} with key {key}");

                return new UploadResponse(true, bucket, filePath, contentType ?? string.Empty, tags ?? new Dictionary<string, string>());
            }

            _logger.LogError($"Failed to upload object to bucket {bucket} with key {key}");

            return new UploadResponse(false, bucket, filePath, contentType ?? string.Empty, tags ?? new Dictionary<string, string>());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to upload object to bucket {bucket} with key {key}");

            return new UploadResponse(false, bucket, filePath, contentType ?? string.Empty, tags ?? new Dictionary<string, string>());
        }
    }

    /// <inheritdoc />
    public async ValueTask<bool> DeleteAsync(
        string bucket, string filePath,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation($"Deleting object from bucket {bucket} with file path {filePath}");

        var response = await _s3Client.DeleteObjectAsync(bucket, filePath);

        if (response is not null && response.HttpStatusCode == HttpStatusCode.NoContent)
        {
            _logger.LogInformation($"Successfully deleted object from bucket {bucket} with file path {filePath}");

            return true;
        }

        _logger.LogError($"Failed to delete object from bucket {bucket} with file path {filePath}");

        return false;
    }

    public async ValueTask<IUploadPartResponse> InitMultiPartUploadAsync(string bucket, string path, string? contentType, IDictionary<string, string>? tags, CancellationToken cancellationToken = default)
    {
        var fileName = Guid.NewGuid().ToString();
        var currentDate = DateTime.UtcNow.Date;
        var filePath = $"{path}/{currentDate:yyyy}/{currentDate:MM}/{currentDate:dd}";
        var key = $"{filePath}/{fileName}";

        _logger.LogInformation($"Uploading object to bucket {bucket} with key {key}");

        var request = new InitiateMultipartUploadRequest()
        {
            BucketName = bucket,
            Key = key,
            ContentType = contentType,
            TagSet = []
        };

        if (!string.IsNullOrEmpty(request.ContentType))
            request.ContentType = contentType;

        if (tags is not null && tags.Any())
            request.TagSet.AddRange(tags.Select(x => new Tag { Key = x.Key, Value = x.Value }));

        InitiateMultipartUploadResponse response = await _s3Client.InitiateMultipartUploadAsync(request);

        return new UploadPartResponse()
        {
            UploadId = response.UploadId,
            PartNumber = 1,
            Key = key,
            Name = fileName,
        };
    }

    public async ValueTask<IUploadPartResponse> UploadPartAsync(string bucket, string key, Stream streamPart, string uploadId, int partNumber, CancellationToken cancellationToken = default)
    {
        var request = new UploadPartRequest()
        {
            BucketName = bucket,
            Key = key,
            UploadId = uploadId,
            PartNumber = partNumber,
            // PartSize = 5 * (long)Math.Pow(2, 20), // 5 MB
            PartSize = streamPart.Length,
            InputStream = streamPart,
            DisablePayloadSigning = _options.Value.DisablePayloadSigning
        };

        var response = await _s3Client.UploadPartAsync(request);

        return new UploadPartResponse()
        {
            UploadId = uploadId,
            PartNumber = partNumber,
            ETag = response.ETag,
        };
    }

    public async ValueTask<bool> CompleteMultiPartUploadAsync(string bucket, string key, string uploadId, Dictionary<int, string> eTags, CancellationToken cancellationToken = default)
    {
        var request = new CompleteMultipartUploadRequest()
        {
            BucketName = bucket,
            Key = key,
            UploadId = uploadId,
            PartETags = eTags.Select(x => new PartETag(x.Key, x.Value)).ToList()
        };

        await _s3Client.CompleteMultipartUploadAsync(request);

        return true;
    }
}

public class UploadResponse(bool success, string bucket, string filePath, string contentType, IDictionary<string, string> tags)
    : IUploadResponse
{
    public bool Success { get; set; } = success;

    public string Bucket { get; set; } = bucket;

    public string FilePath { get; set; } = filePath;

    public string ContentType { get; set; } = contentType;

    public IDictionary<string, string> Tags { get; set; } = tags;
}

public class UploadPartResponse : IUploadPartResponse
{
    public string UploadId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int PartNumber { get; set; }
    public string Key { get; set; } = string.Empty;
    public string ETag { get; set; } = string.Empty;
}