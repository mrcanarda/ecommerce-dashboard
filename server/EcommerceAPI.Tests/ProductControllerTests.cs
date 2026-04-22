using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Controllers;
using EcommerceAPI.Data;
using EcommerceAPI.DTOs;
using EcommerceAPI.Models;

namespace EcommerceAPI.Tests;

public class ProductControllerTests
{
    private AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        var context = new AppDbContext(options);

        context.Products.AddRange(
            new Product { Id = 1, Name = "Headphones",    Category = "Electronics",   Price = 299.99m, Stock = 100, Status = "active",   Image = "", Sales = 50,  CreatedAt = DateTime.UtcNow },
            new Product { Id = 2, Name = "Leather Jacket", Category = "Clothing",      Price = 189.99m, Stock = 50,  Status = "active",   Image = "", Sales = 30,  CreatedAt = DateTime.UtcNow },
            new Product { Id = 3, Name = "Coffee Set",    Category = "Home & Living", Price = 44.99m,  Stock = 200, Status = "draft",    Image = "", Sales = 0,   CreatedAt = DateTime.UtcNow },
            new Product { Id = 4, Name = "Old Camera",    Category = "Electronics",   Price = 99.99m,  Stock = 0,   Status = "archived", Image = "", Sales = 100, CreatedAt = DateTime.UtcNow }
        );
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task GetAll_ReturnsAllProducts()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.GetAll(null, null);

        var ok = Assert.IsType<OkObjectResult>(result);
        var products = Assert.IsType<List<ProductDto>>(ok.Value);
        Assert.Equal(4, products.Count);
    }

    [Fact]
    public async Task GetAll_FilterByStatus_ReturnsOnlyActive()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.GetAll("active", null);

        var ok = Assert.IsType<OkObjectResult>(result);
        var products = Assert.IsType<List<ProductDto>>(ok.Value);
        Assert.Equal(2, products.Count);
        Assert.All(products, p => Assert.Equal("active", p.Status));
    }

    [Fact]
    public async Task GetAll_FilterByCategory_ReturnsCorrectProducts()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.GetAll(null, "Electronics");

        var ok = Assert.IsType<OkObjectResult>(result);
        var products = Assert.IsType<List<ProductDto>>(ok.Value);
        Assert.Equal(2, products.Count);
        Assert.All(products, p => Assert.Equal("Electronics", p.Category));
    }

    [Fact]
    public async Task GetById_WithValidId_ReturnsProduct()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.GetById(1);

        var ok = Assert.IsType<OkObjectResult>(result);
        var product = Assert.IsType<ProductDto>(ok.Value);
        Assert.Equal("Headphones", product.Name);
    }

    [Fact]
    public async Task GetById_WithInvalidId_Returns404()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.GetById(999);

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task Create_WithValidData_Returns201()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.Create(new CreateProductDto
        {
            Name = "New Product",
            Category = "Sports",
            Price = 79.99m,
            Stock = 50,
            Status = "active",
            Image = "",
        });

        var status = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, status.StatusCode);
        Assert.Equal(5, await context.Products.CountAsync());
    }

    [Fact]
    public async Task Update_WithValidId_UpdatesProduct()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.Update(1, new UpdateProductDto
        {
            Name = "Updated Headphones",
            Price = 249.99m,
        });

        var ok = Assert.IsType<OkObjectResult>(result);
        var product = Assert.IsType<ProductDto>(ok.Value);
        Assert.Equal("Updated Headphones", product.Name);
        Assert.Equal(249.99m, product.Price);
    }

    [Fact]
    public async Task Update_WithInvalidId_Returns404()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.Update(999, new UpdateProductDto { Name = "Ghost" });

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task Delete_WithValidId_RemovesProduct()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.Delete(1);

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(3, await context.Products.CountAsync());
    }

    [Fact]
    public async Task Delete_WithInvalidId_Returns404()
    {
        var context = CreateContext();
        var controller = new ProductsController(context);

        var result = await controller.Delete(999);

        Assert.IsType<NotFoundObjectResult>(result);
    }
}