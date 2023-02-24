using api.Core.DependencyInjection;
using api.Core.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddConfigurationOptions(builder.Configuration); 

builder.Services.AddControllers();
//builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();