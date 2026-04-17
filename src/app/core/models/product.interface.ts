export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Subcategory;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

