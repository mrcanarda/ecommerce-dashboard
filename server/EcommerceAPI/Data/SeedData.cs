using EcommerceAPI.Models;

namespace EcommerceAPI.Data;

public static class SeedData
{
    private static DateTime Utc(int year, int month, int day) =>
        DateTime.SpecifyKind(new DateTime(year, month, day), DateTimeKind.Utc);

    public static async Task SeedAsync(AppDbContext context)
    {
        if (!context.Users.Any())
        {
            context.Users.Add(new User
            {
                Name = "Can Arda",
                Email = "demo@orion.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("demo1234"),
                Role = "admin",
                CreatedAt = DateTime.UtcNow,
            });
            await context.SaveChangesAsync();
        }

        if (!context.Customers.Any())
        {
            context.Customers.AddRange(
                new Customer { Name = "Sarah Mitchell",  Email = "sarah.mitchell@email.com",  Avatar = "SM", TotalOrders = 24, TotalSpent = 3842.50m,  Status = "active",   Location = "New York, US",  JoinedAt = Utc(2023, 3, 12)  },
                new Customer { Name = "James Thornton",  Email = "j.thornton@email.com",       Avatar = "JT", TotalOrders = 18, TotalSpent = 2910.00m,  Status = "active",   Location = "London, UK",    JoinedAt = Utc(2023, 5, 8)   },
                new Customer { Name = "Aiko Tanaka",     Email = "aiko.t@email.com",           Avatar = "AT", TotalOrders = 31, TotalSpent = 5120.75m,  Status = "active",   Location = "Tokyo, JP",     JoinedAt = Utc(2023, 1, 20)  },
                new Customer { Name = "Marco Rossi",     Email = "marco.rossi@email.com",      Avatar = "MR", TotalOrders = 9,  TotalSpent = 1240.00m,  Status = "inactive", Location = "Milan, IT",     JoinedAt = Utc(2023, 8, 14)  },
                new Customer { Name = "Lena Müller",     Email = "lena.mueller@email.com",     Avatar = "LM", TotalOrders = 42, TotalSpent = 7380.25m,  Status = "active",   Location = "Berlin, DE",    JoinedAt = Utc(2022, 11, 30) },
                new Customer { Name = "Carlos Mendez",   Email = "c.mendez@email.com",         Avatar = "CM", TotalOrders = 15, TotalSpent = 2100.00m,  Status = "active",   Location = "Madrid, ES",    JoinedAt = Utc(2023, 6, 22)  },
                new Customer { Name = "Emma Johnson",    Email = "emma.j@email.com",           Avatar = "EJ", TotalOrders = 7,  TotalSpent = 890.50m,   Status = "inactive", Location = "Sydney, AU",    JoinedAt = Utc(2023, 9, 10)  },
                new Customer { Name = "Noah Kim",        Email = "noah.kim@email.com",         Avatar = "NK", TotalOrders = 28, TotalSpent = 4560.00m,  Status = "active",   Location = "Seoul, KR",     JoinedAt = Utc(2023, 2, 18)  }
            );
            await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
            context.Products.AddRange(
                new Product { Name = "Wireless Noise-Cancelling Headphones", Category = "Electronics",   Price = 299.99m, Stock = 142, Status = "active",   Image = "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&h=80&fit=crop", Sales = 384, CreatedAt = Utc(2023, 9,  1)  },
                new Product { Name = "Premium Leather Jacket",               Category = "Clothing",      Price = 189.99m, Stock = 58,  Status = "active",   Image = "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=80&h=80&fit=crop", Sales = 210, CreatedAt = Utc(2023, 8,  15) },
                new Product { Name = "Smart Home Hub",                       Category = "Electronics",   Price = 149.99m, Stock = 0,   Status = "archived", Image = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=80&h=80&fit=crop", Sales = 520, CreatedAt = Utc(2023, 7,  20) },
                new Product { Name = "Yoga Mat Pro",                         Category = "Sports",        Price = 79.99m,  Stock = 230, Status = "active",   Image = "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=80&h=80&fit=crop", Sales = 148, CreatedAt = Utc(2023, 10, 5)  },
                new Product { Name = "Minimalist Desk Lamp",                 Category = "Home & Living", Price = 59.99m,  Stock = 12,  Status = "active",   Image = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=80&h=80&fit=crop", Sales = 96,  CreatedAt = Utc(2023, 10, 12) },
                new Product { Name = "Running Shoes Ultra",                  Category = "Sports",        Price = 139.99m, Stock = 74,  Status = "active",   Image = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=80&h=80&fit=crop", Sales = 267, CreatedAt = Utc(2023, 9,  28) },
                new Product { Name = "Ceramic Coffee Set",                   Category = "Home & Living", Price = 44.99m,  Stock = 190, Status = "draft",    Image = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop", Sales = 0,   CreatedAt = Utc(2023, 11, 1)  },
                new Product { Name = "4K Webcam Pro",                        Category = "Electronics",   Price = 199.99m, Stock = 88,  Status = "active",   Image = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop", Sales = 312, CreatedAt = Utc(2023, 8,  30) }
            );
            await context.SaveChangesAsync();
        }

        if (!context.Orders.Any())
        {
            context.Orders.AddRange(
                new Order
                {
                    CustomerId = "c001", CustomerName = "Sarah Mitchell", CustomerEmail = "sarah.mitchell@email.com", CustomerLocation = "New York, US",
                    Total = 419.97m, Status = "delivered",
                    CreatedAt = Utc(2024, 4, 1), UpdatedAt = Utc(2024, 4, 3),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Wireless Headphones",  Quantity = 1, Price = 299.99m },
                        new OrderItem { ProductName = "Minimalist Desk Lamp", Quantity = 2, Price = 59.99m  },
                    }
                },
                new Order
                {
                    CustomerId = "c002", CustomerName = "James Thornton", CustomerEmail = "j.thornton@email.com", CustomerLocation = "London, UK",
                    Total = 189.99m, Status = "shipped",
                    CreatedAt = Utc(2024, 4, 3), UpdatedAt = Utc(2024, 4, 4),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Premium Leather Jacket", Quantity = 1, Price = 189.99m },
                    }
                },
                new Order
                {
                    CustomerId = "c003", CustomerName = "Aiko Tanaka", CustomerEmail = "aiko.t@email.com", CustomerLocation = "Tokyo, JP",
                    Total = 279.98m, Status = "processing",
                    CreatedAt = Utc(2024, 4, 5), UpdatedAt = Utc(2024, 4, 5),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "4K Webcam Pro", Quantity = 1, Price = 199.99m },
                        new OrderItem { ProductName = "Yoga Mat Pro",  Quantity = 1, Price = 79.99m  },
                    }
                },
                new Order
                {
                    CustomerId = "c005", CustomerName = "Lena Müller", CustomerEmail = "lena.mueller@email.com", CustomerLocation = "Berlin, DE",
                    Total = 279.98m, Status = "pending",
                    CreatedAt = Utc(2024, 4, 6), UpdatedAt = Utc(2024, 4, 6),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Running Shoes Ultra", Quantity = 2, Price = 139.99m },
                    }
                },
                new Order
                {
                    CustomerId = "c004", CustomerName = "Marco Rossi", CustomerEmail = "marco.rossi@email.com", CustomerLocation = "Milan, IT",
                    Total = 59.99m, Status = "cancelled",
                    CreatedAt = Utc(2024, 4, 2), UpdatedAt = Utc(2024, 4, 2),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Minimalist Desk Lamp", Quantity = 1, Price = 59.99m },
                    }
                },
                new Order
                {
                    CustomerId = "c008", CustomerName = "Noah Kim", CustomerEmail = "noah.kim@email.com", CustomerLocation = "Seoul, KR",
                    Total = 499.98m, Status = "delivered",
                    CreatedAt = Utc(2024, 3, 28), UpdatedAt = Utc(2024, 3, 31),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Wireless Headphones", Quantity = 1, Price = 299.99m },
                        new OrderItem { ProductName = "4K Webcam Pro",       Quantity = 1, Price = 199.99m },
                    }
                },
                new Order
                {
                    CustomerId = "c006", CustomerName = "Carlos Mendez", CustomerEmail = "c.mendez@email.com", CustomerLocation = "Madrid, ES",
                    Total = 349.97m, Status = "shipped",
                    CreatedAt = Utc(2024, 4, 4), UpdatedAt = Utc(2024, 4, 5),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Premium Leather Jacket", Quantity = 1, Price = 189.99m },
                        new OrderItem { ProductName = "Yoga Mat Pro",           Quantity = 2, Price = 79.99m  },
                    }
                },
                new Order
                {
                    CustomerId = "c007", CustomerName = "Emma Johnson", CustomerEmail = "emma.j@email.com", CustomerLocation = "Sydney, AU",
                    Total = 139.99m, Status = "delivered",
                    CreatedAt = Utc(2024, 3, 25), UpdatedAt = Utc(2024, 3, 27),
                    Items = new List<OrderItem>
                    {
                        new OrderItem { ProductName = "Running Shoes Ultra", Quantity = 1, Price = 139.99m },
                    }
                }
            );
            await context.SaveChangesAsync();
        }
    }
}