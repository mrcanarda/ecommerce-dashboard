import type { Product, Order, Customer, RevenueData, CategoryData, KPIData } from '@/types'

// ============================================
// KPI DATA
// ============================================
export const kpiData: KPIData[] = [
  {
    title: 'Total Revenue',
    value: '$84,254',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: '💰',
  },
  {
    title: 'Total Orders',
    value: '1,429',
    change: 8.2,
    changeLabel: 'vs last month',
    icon: '📦',
  },
  {
    title: 'Total Customers',
    value: '3,842',
    change: 5.1,
    changeLabel: 'vs last month',
    icon: '👥',
  },
  {
    title: 'Avg Order Value',
    value: '$58.96',
    change: -2.4,
    changeLabel: 'vs last month',
    icon: '📊',
  },
]

// ============================================
// REVENUE DATA (12 months)
// ============================================
export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 42000, orders: 820, customers: 310 },
  { month: 'Feb', revenue: 38000, orders: 740, customers: 280 },
  { month: 'Mar', revenue: 51000, orders: 960, customers: 390 },
  { month: 'Apr', revenue: 47000, orders: 890, customers: 340 },
  { month: 'May', revenue: 53000, orders: 1020, customers: 410 },
  { month: 'Jun', revenue: 61000, orders: 1150, customers: 460 },
  { month: 'Jul', revenue: 58000, orders: 1090, customers: 430 },
  { month: 'Aug', revenue: 67000, orders: 1240, customers: 490 },
  { month: 'Sep', revenue: 72000, orders: 1320, customers: 520 },
  { month: 'Oct', revenue: 69000, orders: 1280, customers: 500 },
  { month: 'Nov', revenue: 78000, orders: 1410, customers: 560 },
  { month: 'Dec', revenue: 84000, orders: 1429, customers: 590 },
]

// ============================================
// CATEGORY DATA
// ============================================
export const categoryData: CategoryData[] = [
  { name: 'Electronics', value: 35, color: '#6366F1' },
  { name: 'Clothing',    value: 25, color: '#22C55E' },
  { name: 'Home & Living', value: 20, color: '#F59E0B' },
  { name: 'Sports',      value: 12, color: '#3B82F6' },
  { name: 'Other',       value: 8,  color: '#EF4444' },
]

// ============================================
// CUSTOMERS
// ============================================
export const customers: Customer[] = [
  {
    id: 'c001',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    avatar: 'SM',
    totalOrders: 24,
    totalSpent: 3842.50,
    status: 'active',
    joinedAt: '2023-03-12',
    location: 'New York, US',
  },
  {
    id: 'c002',
    name: 'James Thornton',
    email: 'j.thornton@email.com',
    avatar: 'JT',
    totalOrders: 18,
    totalSpent: 2910.00,
    status: 'active',
    joinedAt: '2023-05-08',
    location: 'London, UK',
  },
  {
    id: 'c003',
    name: 'Aiko Tanaka',
    email: 'aiko.t@email.com',
    avatar: 'AT',
    totalOrders: 31,
    totalSpent: 5120.75,
    status: 'active',
    joinedAt: '2023-01-20',
    location: 'Tokyo, JP',
  },
  {
    id: 'c004',
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    avatar: 'MR',
    totalOrders: 9,
    totalSpent: 1240.00,
    status: 'inactive',
    joinedAt: '2023-08-14',
    location: 'Milan, IT',
  },
  {
    id: 'c005',
    name: 'Lena Müller',
    email: 'lena.mueller@email.com',
    avatar: 'LM',
    totalOrders: 42,
    totalSpent: 7380.25,
    status: 'active',
    joinedAt: '2022-11-30',
    location: 'Berlin, DE',
  },
  {
    id: 'c006',
    name: 'Carlos Mendez',
    email: 'c.mendez@email.com',
    avatar: 'CM',
    totalOrders: 15,
    totalSpent: 2100.00,
    status: 'active',
    joinedAt: '2023-06-22',
    location: 'Madrid, ES',
  },
  {
    id: 'c007',
    name: 'Emma Johnson',
    email: 'emma.j@email.com',
    avatar: 'EJ',
    totalOrders: 7,
    totalSpent: 890.50,
    status: 'inactive',
    joinedAt: '2023-09-10',
    location: 'Sydney, AU',
  },
  {
    id: 'c008',
    name: 'Noah Kim',
    email: 'noah.kim@email.com',
    avatar: 'NK',
    totalOrders: 28,
    totalSpent: 4560.00,
    status: 'active',
    joinedAt: '2023-02-18',
    location: 'Seoul, KR',
  },
]

// ============================================
// PRODUCTS
// ============================================
export const products: Product[] = [
  {
    id: 'p001',
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 142,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&h=80&fit=crop',
    createdAt: '2023-09-01',
    sales: 384,
  },
  {
    id: 'p002',
    name: 'Premium Leather Jacket',
    category: 'Clothing',
    price: 189.99,
    stock: 58,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=80&h=80&fit=crop',
    createdAt: '2023-08-15',
    sales: 210,
  },
  {
    id: 'p003',
    name: 'Smart Home Hub',
    category: 'Electronics',
    price: 149.99,
    stock: 0,
    status: 'archived',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=80&h=80&fit=crop',
    createdAt: '2023-07-20',
    sales: 520,
  },
  {
    id: 'p004',
    name: 'Yoga Mat Pro',
    category: 'Sports',
    price: 79.99,
    stock: 230,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=80&h=80&fit=crop',
    createdAt: '2023-10-05',
    sales: 148,
  },
  {
    id: 'p005',
    name: 'Minimalist Desk Lamp',
    category: 'Home & Living',
    price: 59.99,
    stock: 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=80&h=80&fit=crop',
    createdAt: '2023-10-12',
    sales: 96,
  },
  {
    id: 'p006',
    name: 'Running Shoes Ultra',
    category: 'Sports',
    price: 139.99,
    stock: 74,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop',
    createdAt: '2023-09-28',
    sales: 267,
  },
  {
    id: 'p007',
    name: 'Ceramic Coffee Set',
    category: 'Home & Living',
    price: 44.99,
    stock: 190,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop',
    createdAt: '2023-11-01',
    sales: 0,
  },
  {
    id: 'p008',
    name: '4K Webcam Pro',
    category: 'Electronics',
    price: 199.99,
    stock: 88,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop',
    createdAt: '2023-08-30',
    sales: 312,
  },
]

// ============================================
// ORDERS
// ============================================
export const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: customers[0],
    products: [
      { productId: 'p001', productName: 'Wireless Headphones', quantity: 1, price: 299.99 },
      { productId: 'p005', productName: 'Minimalist Desk Lamp', quantity: 2, price: 59.99 },
    ],
    total: 419.97,
    status: 'delivered',
    createdAt: '2024-04-01',
    updatedAt: '2024-04-03',
  },
  {
    id: 'ORD-002',
    customer: customers[1],
    products: [
      { productId: 'p002', productName: 'Premium Leather Jacket', quantity: 1, price: 189.99 },
    ],
    total: 189.99,
    status: 'shipped',
    createdAt: '2024-04-03',
    updatedAt: '2024-04-04',
  },
  {
    id: 'ORD-003',
    customer: customers[2],
    products: [
      { productId: 'p008', productName: '4K Webcam Pro', quantity: 1, price: 199.99 },
      { productId: 'p004', productName: 'Yoga Mat Pro', quantity: 1, price: 79.99 },
    ],
    total: 279.98,
    status: 'processing',
    createdAt: '2024-04-05',
    updatedAt: '2024-04-05',
  },
  {
    id: 'ORD-004',
    customer: customers[4],
    products: [
      { productId: 'p006', productName: 'Running Shoes Ultra', quantity: 2, price: 139.99 },
    ],
    total: 279.98,
    status: 'pending',
    createdAt: '2024-04-06',
    updatedAt: '2024-04-06',
  },
  {
    id: 'ORD-005',
    customer: customers[3],
    products: [
      { productId: 'p005', productName: 'Minimalist Desk Lamp', quantity: 1, price: 59.99 },
    ],
    total: 59.99,
    status: 'cancelled',
    createdAt: '2024-04-02',
    updatedAt: '2024-04-02',
  },
  {
    id: 'ORD-006',
    customer: customers[7],
    products: [
      { productId: 'p001', productName: 'Wireless Headphones', quantity: 1, price: 299.99 },
      { productId: 'p008', productName: '4K Webcam Pro', quantity: 1, price: 199.99 },
    ],
    total: 499.98,
    status: 'delivered',
    createdAt: '2024-03-28',
    updatedAt: '2024-03-31',
  },
  {
    id: 'ORD-007',
    customer: customers[5],
    products: [
      { productId: 'p002', productName: 'Premium Leather Jacket', quantity: 1, price: 189.99 },
      { productId: 'p004', productName: 'Yoga Mat Pro', quantity: 2, price: 79.99 },
    ],
    total: 349.97,
    status: 'shipped',
    createdAt: '2024-04-04',
    updatedAt: '2024-04-05',
  },
  {
    id: 'ORD-008',
    customer: customers[6],
    products: [
      { productId: 'p006', productName: 'Running Shoes Ultra', quantity: 1, price: 139.99 },
    ],
    total: 139.99,
    status: 'delivered',
    createdAt: '2024-03-25',
    updatedAt: '2024-03-27',
  },
]