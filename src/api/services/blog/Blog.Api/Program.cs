using Sisa.Blog.Data;
using Sisa.Constants;
using Sisa.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

// Add services to the container.
builder.Services.AddCommonConfiguration();

builder.Services.AddGrpcService(builder.Environment);
builder.Services.AddGrpcReflection();

builder.Services.AddMediator();
builder.Services.AddMediatorDependencies();
builder.Services.AddDataDependencies();

// builder.Services.Configure<AppSettings>(builder.Configuration.GetSection(nameof(AppSettings)));
// var appSettings = builder.Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>()!;

var connectionString = builder.Configuration
    .GetConnectionString(SchemaConstants.DEFAULT_CONNECTION)!;

var distributedCachingConnectionString = builder.Configuration
    .GetConnectionString(SchemaConstants.DISTRIBUTED_CACHING_CONNECTION)!;

#region DbContext

builder.Services
    .AddDbContextFactory<BlogDbContext>((serviceProvider, options)
        => options.UseDatabase(serviceProvider, connectionString));

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.MapGrpcServices();

// if (app.Environment.IsDevelopment())
// {
app.MapGrpcReflectionService();
// }

app.Run();
