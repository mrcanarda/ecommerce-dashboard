using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.DTOs;

namespace EcommerceAPI.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var totalRevenue = await _context.Orders
            .Where(o => o.Status != "cancelled")
            .SumAsync(o => o.Total);

        var totalOrders = await _context.Orders.CountAsync();
        var totalCustomers = await _context.Customers.CountAsync();
        var avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return Ok(new DashboardSummaryDto
        {
            TotalRevenue = totalRevenue,
            TotalOrders = totalOrders,
            TotalCustomers = totalCustomers,
            AvgOrderValue = avgOrderValue,
            RevenueChange = 12.5,
            OrdersChange = 8.2,
            CustomersChange = 5.1,
            AvgOrderChange = -2.4,
        });
    }

    [HttpGet("revenue")]
    public async Task<IActionResult> GetRevenueData()
    {
        var data = new List<RevenueDataDto>
        {
            new RevenueDataDto { Month = "Jan", Revenue = 42000, Orders = 820,  Customers = 310 },
            new RevenueDataDto { Month = "Feb", Revenue = 38000, Orders = 740,  Customers = 280 },
            new RevenueDataDto { Month = "Mar", Revenue = 51000, Orders = 960,  Customers = 390 },
            new RevenueDataDto { Month = "Apr", Revenue = 47000, Orders = 890,  Customers = 340 },
            new RevenueDataDto { Month = "May", Revenue = 53000, Orders = 1020, Customers = 410 },
            new RevenueDataDto { Month = "Jun", Revenue = 61000, Orders = 1150, Customers = 460 },
            new RevenueDataDto { Month = "Jul", Revenue = 58000, Orders = 1090, Customers = 430 },
            new RevenueDataDto { Month = "Aug", Revenue = 67000, Orders = 1240, Customers = 490 },
            new RevenueDataDto { Month = "Sep", Revenue = 72000, Orders = 1320, Customers = 520 },
            new RevenueDataDto { Month = "Oct", Revenue = 69000, Orders = 1280, Customers = 500 },
            new RevenueDataDto { Month = "Nov", Revenue = 78000, Orders = 1410, Customers = 560 },
            new RevenueDataDto { Month = "Dec", Revenue = 84000, Orders = 1429, Customers = 590 },
        };

        return Ok(data);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Products
            .GroupBy(p => p.Category)
            .Select(g => new
            {
                Name = g.Key,
                Count = g.Count(),
                TotalSales = g.Sum(p => p.Sales),
            })
            .ToListAsync();

        return Ok(categories);
    }
}