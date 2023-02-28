using api.Core.DependencyInjection;
using api.Core.Extensions;

var allowAllCors = "AllowAllOriginsHeadersAndMethods";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddConfigurationOptions(builder.Configuration); 

builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllCors, builder => 
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddHttpClients(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowAllCors);

app.UseAuthorization();

app.MapControllers();

app.Run();