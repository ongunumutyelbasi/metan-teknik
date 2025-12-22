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
  features: string[]; // For the "Özellikler" bullet points
  specs: ProductSpec[]; // For the "Teknik Özellikler" table
}

export const products: Product[] = [
  {
    id: "500200",
    slug: "e-904",
    name: "e 904",
    subtitle: "Davullarınızı netlikle yakalayın",
    description: "Sennheiser E 904, davul ve perküsyon dünyasında gerçek bir işgücüdür. Çok hızlı saldırı ve mükemmel ses profili sunar.",
    price: 0, // Set your price
    productImg: "/images/products/e-904.png",
    category: "Mikrofonlar",
    features: [
      "Davul ve perküsyon için tam canlı ses",
      "Çok hızlı saldırı (Attack)",
      "Kompakt gövde",
      "Sağlam metal gövde"
    ],
    specs: [
      { label: "Transducer principle", value: "dynamic" },
      { label: "Pick-up pattern", value: "cardioid" },
      { label: "Frequency response", value: "40 - 18000 Hz" },
      { label: "Nominal impedance", value: "350 Ω" }
    ]
  }
];