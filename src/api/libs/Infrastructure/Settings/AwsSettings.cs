namespace Sisa.Infrastructure.Settings;

public record AwsSettings(string AccessKey, string SecretKey, string Region, string Bucket)
{
}
