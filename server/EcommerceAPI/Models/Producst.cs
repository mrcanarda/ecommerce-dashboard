namespace EcommerceAPI.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string Status { get; set; } = "active"; 
    public string Image { get; set; } = string.Empty;
    public int Sales { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}