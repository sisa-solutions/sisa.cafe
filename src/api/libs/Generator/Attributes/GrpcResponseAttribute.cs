namespace Sisa.Generator;

[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
public class GrpcResponseAttribute : Attribute
{
    public Type? SingelType { get; private set; }
    public Type? ListType { get; private set; }

    public GrpcResponseAttribute(Type? singelType, Type? listType)
    {
        SingelType = singelType;
        ListType = listType;
    }
}
