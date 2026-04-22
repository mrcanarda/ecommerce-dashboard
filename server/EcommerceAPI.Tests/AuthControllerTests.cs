using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using EcommerceAPI.Controllers;
using EcommerceAPI.Data;
using EcommerceAPI.DTOs;

namespace EcommerceAPI.Tests;

public class AuthControllerTests
{
    private AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    private IConfiguration CreateConfig()
    {
        var settings = new Dictionary<string, string?>
        {
            { "Jwt:Secret", "orion-super-secret-key-2024-ecommerce-dashboard-jwt" },
            { "Jwt:Issuer", "orion-api" },
            { "Jwt:Audience", "orion-client" },
        };
        return new ConfigurationBuilder()
            .AddInMemoryCollection(settings)
            .Build();
    }

    [Fact]
    public async Task Register_WithValidData_Returns201()
    {
        var context = CreateContext();
        var controller = new AuthController(context, CreateConfig());

        var result = await controller.Register(new RegisterDto
        {
            Name = "Test User",
            Email = "test@example.com",
            Password = "password123",
        });

        var status = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, status.StatusCode);
    }

    [Fact]
    public async Task Register_WithDuplicateEmail_Returns400()
    {
        var context = CreateContext();
        var controller = new AuthController(context, CreateConfig());

        await controller.Register(new RegisterDto
        {
            Name = "User One",
            Email = "duplicate@example.com",
            Password = "password123",
        });

        var result = await controller.Register(new RegisterDto
        {
            Name = "User Two",
            Email = "duplicate@example.com",
            Password = "password456",
        });

        var status = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, status.StatusCode);
    }

    [Fact]
    public async Task Login_WithValidCredentials_Returns200WithToken()
    {
        var context = CreateContext();
        var controller = new AuthController(context, CreateConfig());

        await controller.Register(new RegisterDto
        {
            Name = "Login User",
            Email = "login@example.com",
            Password = "password123",
        });

        var result = await controller.Login(new LoginDto
        {
            Email = "login@example.com",
            Password = "password123",
        });

        var ok = Assert.IsType<OkObjectResult>(result);
        var response = Assert.IsType<AuthResponseDto>(ok.Value);
        Assert.NotEmpty(response.Token);
        Assert.Equal("login@example.com", response.Email);
    }

    [Fact]
    public async Task Login_WithWrongPassword_Returns401()
    {
        var context = CreateContext();
        var controller = new AuthController(context, CreateConfig());

        await controller.Register(new RegisterDto
        {
            Name = "Login User",
            Email = "wrong@example.com",
            Password = "correctpassword",
        });

        var result = await controller.Login(new LoginDto
        {
            Email = "wrong@example.com",
            Password = "wrongpassword",
        });

        var status = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal(401, status.StatusCode);
    }

    [Fact]
    public async Task Login_WithNonExistentEmail_Returns401()
    {
        var context = CreateContext();
        var controller = new AuthController(context, CreateConfig());

        var result = await controller.Login(new LoginDto
        {
            Email = "nonexistent@example.com",
            Password = "password123",
        });

        var status = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal(401, status.StatusCode);
    }
}