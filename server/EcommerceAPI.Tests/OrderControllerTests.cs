using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Controllers;
using EcommerceAPI.Data;
using EcommerceAPI.DTOs;
using EcommerceAPI.Models;

namespace EcommerceAPI.Tests;

public class OrderControllerTests
{
    private AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        var context = new AppDbContext(options);

        context.Orders.AddRange(
            new Order
            {
                Id = 1, CustomerId = "c001", CustomerName = "Sarah Mitchell",
                CustomerEmail = "sarah@email.com", CustomerLocation = "New York, US",
                Total = 419.97m, Status = "delivered",
                CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow,
                Items = new List<OrderItem>
                {
                    new OrderItem { ProductName = "Headphones", Quantity = 1, Price = 299.99m },
                    new OrderItem { ProductName = "Desk Lamp",  Quantity = 2, Price = 59.99m  },
                }
            },
            new Order
            {
                Id = 2, CustomerId = "c002", CustomerName = "James Thornton",
                CustomerEmail = "james@email.com", CustomerLocation = "London, UK",
                Total = 189.99m, Status = "shipped",
                CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow,
                Items = new List<OrderItem>
                {
                    new OrderItem { ProductName = "Leather Jacket", Quantity = 1, Price = 189.99m },
                }
            },
            new Order
            {
                Id = 3, CustomerId = "c003", CustomerName = "Aiko Tanaka",
                CustomerEmail = "aiko@email.com", CustomerLocation = "Tokyo, JP",
                Total = 79.99m, Status = "pending",
                CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow,
                Items = new List<OrderItem>
                {
                    new OrderItem { ProductName = "Yoga Mat", Quantity = 1, Price = 79.99m },
                }
            }
        );
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task GetAll_ReturnsAllOrders()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetAll();

        var ok = Assert.IsType<OkObjectResult>(result);
        var paginated = Assert.IsType<PaginatedOrdersDto>(ok.Value);
        Assert.Equal(3, paginated.Total);
    }

    [Fact]
    public async Task GetAll_FilterByStatus_ReturnsCorrectOrders()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetAll(status: "shipped");

        var ok = Assert.IsType<OkObjectResult>(result);
        var paginated = Assert.IsType<PaginatedOrdersDto>(ok.Value);
        Assert.Equal(1, paginated.Total);
        Assert.All(paginated.Data, o => Assert.Equal("shipped", o.Status));
    }

    [Fact]
    public async Task GetAll_Pagination_ReturnsCorrectPage()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetAll(page: 1, limit: 2);

        var ok = Assert.IsType<OkObjectResult>(result);
        var paginated = Assert.IsType<PaginatedOrdersDto>(ok.Value);
        Assert.Equal(2, paginated.Data.Count);
        Assert.Equal(3, paginated.Total);
        Assert.Equal(2, paginated.TotalPages);
    }

    [Fact]
    public async Task GetAll_SearchByCustomerName_ReturnsCorrectOrders()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetAll(search: "sarah");

        var ok = Assert.IsType<OkObjectResult>(result);
        var paginated = Assert.IsType<PaginatedOrdersDto>(ok.Value);
        Assert.Equal(1, paginated.Total);
        Assert.Equal("Sarah Mitchell", paginated.Data[0].CustomerName);
    }

    [Fact]
    public async Task GetById_WithValidId_ReturnsOrderWithItems()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetById(1);

        var ok = Assert.IsType<OkObjectResult>(result);
        var order = Assert.IsType<OrderDto>(ok.Value);
        Assert.Equal("Sarah Mitchell", order.CustomerName);
        Assert.Equal(2, order.Items.Count);
    }

    [Fact]
    public async Task GetById_WithInvalidId_Returns404()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.GetById(999);

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task Create_WithValidData_Returns201()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.Create(new CreateOrderDto
        {
            CustomerId = "c004",
            CustomerName = "New Customer",
            CustomerEmail = "new@email.com",
            CustomerLocation = "Berlin, DE",
            Items = new List<CreateOrderItemDto>
            {
                new CreateOrderItemDto { ProductName = "Webcam", Quantity = 1, Price = 199.99m },
            }
        });

        var status = Assert.IsType<ObjectResult>(result);
        Assert.Equal(201, status.StatusCode);
        Assert.Equal(4, await context.Orders.CountAsync());
    }

    [Fact]
    public async Task UpdateStatus_WithValidId_UpdatesStatus()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.UpdateStatus(3, new UpdateOrderStatusDto
        {
            Status = "processing"
        });

        var ok = Assert.IsType<OkObjectResult>(result);
        var order = await context.Orders.FindAsync(3);
        Assert.Equal("processing", order!.Status);
    }

    [Fact]
    public async Task UpdateStatus_WithInvalidId_Returns404()
    {
        var context = CreateContext();
        var controller = new OrdersController(context);

        var result = await controller.UpdateStatus(999, new UpdateOrderStatusDto
        {
            Status = "processing"
        });

        Assert.IsType<NotFoundObjectResult>(result);
    }
}