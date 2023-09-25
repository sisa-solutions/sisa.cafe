using Sisa.Domain.AggregatesModel.AuditableAggregate;
using Sisa.Enums;

namespace Sisa.Blog.Domain.AggregatesModel.UserAggregate;

public class User : FullAuditableAggregateRoot
{
    public string FistName { get; private set; }
    public string LastName { get; private set; }

    public string FullName { get; private set; }

    public string? DisplayName { get; private set; }

    public Gender Gender { get;private  set; }
    public string? Avatar { get; private set; }

    public string Email { get; private set; }
    public string? PhoneNumber { get; private set; }
    
    public string? Bio { get; private set; }

    public User(string fistName, string lastName, string fullName, string email)
    {
        FistName = fistName;
        LastName = lastName;
        FullName = fullName;
        Email = email;
    }

    public void Update(string fistName, string lastName, string fullName, string email)
    {
        FistName = fistName;
        LastName = lastName;
        FullName = fullName;
        Email = email;
    }

    public void UpdateAvatar(string avatar)
    {
        Avatar = avatar;
    }

    public void UpdateDisplayName(string displayName)
    {
        DisplayName = displayName;
    }

    public void UpdateBio(string bio)
    {
        Bio = bio;
    }

    public void UpdatePhoneNumber(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}