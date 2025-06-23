var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ADICIONE ESTA CONFIGURA��O DE CORS (logo ap�s AddSwaggerGen)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()  // Permite qualquer origem (em produ��o, especifique suas URLs)
              .AllowAnyMethod()  // Permite todos os m�todos HTTP (GET, POST, etc.)
              .AllowAnyHeader(); // Permite todos os cabe�alhos
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ADICIONE ESTE MIDDLEWARE (antes de UseAuthorization e depois de UseRouting)
app.UseCors("AllowAll"); // Habilita a pol�tica CORS que configuramos acima

app.UseAuthorization();

app.MapControllers();

app.Run();