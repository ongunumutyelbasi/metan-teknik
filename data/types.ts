export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  productImg: string;
  category: string;
  features: string[]; 
  specs: ProductSpec[];
  articleNo?: string; // Adding this as optional to prevent errors in existing code
}