using Sisa.Blog.Data;
using Sisa.Constants;
using Sisa.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

// Add services to the container.
builder.Services.AddCommonConfiguration();

builder.Services.AddGrpcService(builder.Environment);
builder.Services.AddGrpcReflection();

builder.Services.AddFluentValidation();
builder.Services.AddMediator();
builder.Services.AddMediatorDependencies();
builder.Services.AddDataDependencies();
builder.Services.AddFileStorageService(
    new Sisa.Infrastructure.Settings.AwsSettings(
        serviceUrl: "https://48cc388ce8732400b061994f2395fb01.r2.cloudflarestorage.com",
        region: "us-east-1",
        accessKey: "96d5ba19024eb350ee856dfd031d26b3",
        secretKey: "96ef6d4686f29ef1cfa1e209bee29dcb3a2327660f88a7404a77bae03282c915",
        chunkSize: 5_242_880L,
        disablePayloadSigning: true,
        defaultBucket: "sisa-cafe-local"
    )
);

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
