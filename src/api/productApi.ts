import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(`${BASE_URL}/products/categories`);
  return data;
};
