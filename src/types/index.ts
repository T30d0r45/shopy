export type UserRole = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';

export type OrderStatus = 'NEW' | 'IN_REVIEW' | 'OFFER_SENT' | 'CONFIRMED' | 'REJECTED';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  profile?: Profile;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  category_id?: string;
  name: string;
  short_description: string;
  description: string;
  images: string[];
  base_price: number;
  attributes: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface OrderRequestItem {
  product_id: string;
  quantity: number;
}

export interface OrderRequest {
  id: string;
  user_id: string;
  items: OrderRequestItem[];
  notes?: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CreateOrderRequestDto {
  items: OrderRequestItem[];
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  full_name: string;
}

export interface CreateProductDto {
  slug: string;
  category_id?: string;
  name: string;
  short_description: string;
  description: string;
  images: string[];
  base_price: number;
  attributes: Record<string, any>;
  is_active: boolean;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface CreateCategoryDto {
  slug: string;
  name: string;
  description?: string;
  image_url?: string;
}

export interface UpdateUserRoleDto {
  role: UserRole;
}
