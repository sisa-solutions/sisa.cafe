namespace Sisa.Infrastructure.Settings;

public class AwsSettings
{
    public string ServiceUrl { get; set; } = string.Empty;
    public string AccessKey { get; set; } = string.Empty;
    public string SecretKey { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Bucket { get; set; } = string.Empty;

    public bool DisablePayloadSigning { get; set; } = false;

    public AwsSettings() { }

    public AwsSettings(
        string accessKey,
        string secretKey,
        string region,
        bool disablePayloadSigning = false,
        string bucket = ""
    ) : this()
    {
        AccessKey = accessKey;
        SecretKey = secretKey;
        Region = region;
        DisablePayloadSigning = disablePayloadSigning;
        Bucket = bucket;
    }

    public AwsSettings(
        string serviceUrl,
        string accessKey,
        string secretKey,
        string region,
        bool disablePayloadSigning = false,
        string bucket = ""
    ) : this(accessKey, secretKey, region, disablePayloadSigning, bucket)
    {
        ServiceUrl = serviceUrl;
    }
}
