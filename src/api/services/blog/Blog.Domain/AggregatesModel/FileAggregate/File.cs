using Sisa.Domain.AggregatesModel.AuditableAggregate;

namespace Sisa.Blog.Domain.AggregatesModel.FileAggregate;

/// <summary>
/// Document entity
/// File name with matched with the Id
/// </summary>
public class File : AuditableAggregateRoot
{
    public string OriginalName { get; private set; }
    public string Bucket { get; init; }
    public string Path { get; private set; }
    public string Name { get; private set; }
    public int Size { get; private set; }

    public string? Extension { get; private set; }
    public string? MimeType { get; private set; }
    public string? Title { get; private set; }
    public string? Description { get; private set; }

    /// <summary>
    /// Determine if the file was uploaded to the cloud or not
    /// </summary>
    public bool IsUploaded { get; private set; }
    public string? Remarks { get; private set; }

    private readonly Dictionary<string, string> _tags = [];

    public IReadOnlyDictionary<string, string> Tags => _tags;

    public File(string originalName, string bucket, string path, string name, int size, string extension, string mimeType)
    {
        OriginalName = originalName;
        Bucket = bucket;
        Path = path;
        Name = name;
        Extension = extension;
        MimeType = mimeType;
        Size = size;
    }

    public void Describe(string title, string description)
    {
        Title = title;
        Description = description;
    }

    public void Uploaded(string path)
    {
        Path = path;
        IsUploaded = true;
    }

    public void FailedToUpload(string remarks)
    {
        IsUploaded = false;
        Remarks = remarks;
    }

    public void AddOrUpdateTag(string key, string value)
    {
        if (_tags.ContainsKey(key))
        {
            _tags[key] = value;
        }
        else
        {
            _tags.Add(key, value);
        }
    }

    public void RemoveTag(string key)
    {
        _tags.Remove(key);
    }

    public void ClearTag()
    {
        _tags.Clear();
    }
}

