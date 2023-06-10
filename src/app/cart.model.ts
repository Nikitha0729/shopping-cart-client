export interface Cart {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  productId?: string;
  userId?: string;
  createdAt?: Date;
}
