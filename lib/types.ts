export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  col_name: string;
  description: string;
  stock: number;
  is_hidden?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SellerStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  lowStockAlerts: number;
}

export interface Order {
  id: string;
  buyerName: string;
  phone: string;
  items: { productName: string; qty: number; price: number }[];
  totalAmount: number;
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Delivered';
  createdAt: string;
}
