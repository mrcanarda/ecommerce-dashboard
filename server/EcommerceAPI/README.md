# Orion E-commerce API


A production-ready REST API built with **C# / ASP.NET Core 10**, **PostgreSQL**, and **Entity Framework Core**. Powers the Orion E-commerce Dashboard frontend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | ASP.NET Core 10 Web API |
| Language | C# 13 |
| ORM | Entity Framework Core 10 |
| Database | PostgreSQL 16 |
| Authentication | JWT Bearer Tokens |
| Password Hashing | BCrypt.Net |
| API Docs | ASP.NET Core OpenAPI |

## Architecture
EcommerceAPI/
├── Controllers/        # HTTP endpoints (Auth, Products, Orders, Customers, Dashboard)
├── Data/               # DbContext + Seed data
├── DTOs/               # Request/Response shapes
├── Migrations/         # EF Core database migrations
├── Models/             # Entity models (User, Product, Order, Customer)
├── Services/           # Business logic layer
└── Program.cs          # App bootstrap, DI, middleware pipeline

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create new account | ❌ |
| POST | `/api/auth/login` | Login, returns JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | List all products (filter by status, category) | ✅ |
| GET | `/api/products/{id}` | Get single product | ✅ |
| POST | `/api/products` | Create product | ✅ |
| PUT | `/api/products/{id}` | Update product | ✅ |
| DELETE | `/api/products/{id}` | Delete product | ✅ |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Paginated orders (filter by status, search) | ✅ |
| GET | `/api/orders/{id}` | Get single order with items | ✅ |
| POST | `/api/orders` | Create order | ✅ |
| PATCH | `/api/orders/{id}/status` | Update order status | ✅ |

### Customers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/customers` | List all customers (filter by status) | ✅ |
| GET | `/api/customers/{id}` | Get single customer | ✅ |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard/summary` | KPI metrics (revenue, orders, customers) | ✅ |
| GET | `/api/dashboard/revenue` | 12-month revenue chart data | ✅ |
| GET | `/api/dashboard/categories` | Sales by product category | ✅ |

## Getting Started

### Prerequisites
- .NET 10 SDK
- PostgreSQL 16

### Setup

```bash
# Clone the repo
git clone https://github.com/mrcanarda/ecommerce-dashboard.git
cd ecommerce-dashboard/server/EcommerceAPI

# Configure database connection
# Edit appsettings.json:
# "DefaultConnection": "Host=localhost;Port=5432;Database=orion_ecommerce;Username=YOUR_USER;Password="

# Create database
psql postgres -c "CREATE DATABASE orion_ecommerce;"

# Run migrations + seed data
dotnet ef database update

# Start the API
dotnet run
```

API runs at: `http://localhost:5209`

## Authentication

All protected endpoints require a JWT Bearer token:

```bash
# 1. Login to get token
curl -X POST http://localhost:5209/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@orion.com","password":"demo1234"}'

# 2. Use token in requests
curl http://localhost:5209/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Demo Credentials
Email:    demo@orion.com
Password: demo1234

## Environment Variables

| Key | Description | Example |
|-----|-------------|---------|
| `ConnectionStrings:DefaultConnection` | PostgreSQL connection string | `Host=localhost;...` |
| `Jwt:Secret` | JWT signing secret (min 32 chars) | `your-secret-key` |
| `Jwt:Issuer` | JWT issuer | `orion-api` |
| `Jwt:Audience` | JWT audience | `orion-client` |

## Database Schema
Users          — id, name, email, passwordHash, role, createdAt
Products       — id, name, category, price, stock, status, image, sales, createdAt
Customers      — id, name, email, avatar, totalOrders, totalSpent, status, location, joinedAt
Orders         — id, customerId, customerName, total, status, createdAt, updatedAt
OrderItems     — id, orderId, productName, quantity, price