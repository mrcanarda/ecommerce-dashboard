// ============================================
// PRODUCT
// ============================================
export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  image: string
  createdAt: string
  sales: number
}

// ============================================
// ORDER
// ============================================
export interface Order {
  id: string
  customer: Customer
  products: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

// ============================================
// CUSTOMER
// ============================================
export interface Customer {
  id: string
  name: string
  email: string
  avatar: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive'
  joinedAt: string
  location: string
}

// ============================================
// DASHBOARD
// ============================================
export interface KPIData {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: string
}

export interface RevenueData {
  month: string
  revenue: number
  orders: number
  customers: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

// ============================================
// API RESPONSE
// ============================================
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}