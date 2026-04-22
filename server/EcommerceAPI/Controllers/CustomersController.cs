using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.DTOs;

namespace EcommerceAPI.Controllers;

[ApiController]
[Route("api/customers")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status)
    {
        var query = _context.Customers.AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(c => c.Status == status);

        var customers = await query
            .OrderByDescending(c => c.JoinedAt)
            .Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Avatar = c.Avatar,
                TotalOrders = c.TotalOrders,
                TotalSpent = c.TotalSpent,
                Status = c.Status,
                Location = c.Location,
                JoinedAt = c.JoinedAt,
            })
            .ToListAsync();

        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null) return NotFound(new { message = "Customer not found" });

        return Ok(new CustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Email = customer.Email,
            Avatar = customer.Avatar,
            TotalOrders = customer.TotalOrders,
            TotalSpent = customer.TotalSpent,
            Status = customer.Status,
            Location = customer.Location,
            JoinedAt = customer.JoinedAt,
        });
    }
}