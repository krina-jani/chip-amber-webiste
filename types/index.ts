export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subCategory?: string;
  fitLabel?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hasVideo?: boolean;
  colors: ProductColor[];
  sizes: string[];
  badge?: "BEST SELLER" | "NEW" | "SALE" | "LIMITED";
  description: string;
  materials: string;
  gsm?: number;
  fitInfo: string;
  shippingInfo: string;
  returnsInfo: string;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  bundleProductSlug?: string;
  bundleDiscount?: number;
  reviews?: Review[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
}

export interface CartItem {
  id: string; // unique identifier combination of productId-color-size
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: ProductColor;
  size: string;
  quantity: number;
}

export type OrderStatus =
  | "Order Placed"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export interface Address {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: "featured" | "bestseller" | "price-asc" | "price-desc" | "newest" | "rating";
}
