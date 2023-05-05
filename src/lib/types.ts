type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type UserSession = Omit<User, "cart">;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cart: Cart;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: { rate: number; count: number };
  category: string;
  image: string;
  sku: Number;
};

export type Cart = {
  items: CartItem[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};
