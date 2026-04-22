namespace EcommerceAPI.Models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public int TotalOrders { get; set; } = 0;
    public decimal TotalSpent { get; set; } = 0;
    public string Status { get; set; } = "active"; // active, inactive
    public string Location { get; set; } = string.Empty;
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}