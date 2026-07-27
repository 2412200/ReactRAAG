import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Slim Fit Denim Jeans',
    price: 1499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=500&q=80',
    category: 'Apparel',
    col_name: 'apparel',
    description: 'Premium stretch denim cotton jeans with classic 5-pocket styling.',
    stock: 45
  },
  {
    id: '2',
    name: 'Cold Pressed Sunflower Oil (5L)',
    price: 850,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
    category: 'FMCG',
    col_name: 'fmcg',
    description: '100% pure cold-pressed sunflower cooking oil, unrefined & nutrient-rich.',
    stock: 120
  },
  {
    id: '3',
    name: 'Wireless Noise Cancelling Earbuds',
    price: 3299,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    category: 'Electronics',
    col_name: 'mobile_accessories',
    description: 'Bluetooth 5.3 earbuds with active noise cancellation and 30hr battery life.',
    stock: 28
  },
  {
    id: '4',
    name: 'Matte Liquid Lipstick Set (Pack of 4)',
    price: 999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',
    category: 'Beauty',
    col_name: 'beauty',
    description: 'Long-lasting waterproof matte liquid lipsticks in trending nude shades.',
    stock: 80
  },
  {
    id: '5',
    name: 'Stainless Steel TMT Rebar (12mm Grade 500D)',
    price: 4800,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&q=80',
    category: 'Steel Work',
    col_name: 'steel_work',
    description: 'High tensile strength corrosion resistant TMT bars for construction.',
    stock: 15
  },
  {
    id: '6',
    name: 'Multivitamin Health Supplements (60 Capsules)',
    price: 649,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80',
    category: 'Pharma',
    col_name: 'pharma',
    description: 'Daily essential immunity booster vitamins and mineral complex.',
    stock: 200
  },
  {
    id: '7',
    name: 'Modern Ergonomic Office Chair',
    price: 7499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80',
    category: 'Furniture',
    col_name: 'furniture',
    description: 'High-back mesh ergonomic chair with lumbar support and 3D armrests.',
    stock: 12
  },
  {
    id: '8',
    name: 'Educational STEM Building Block Set',
    price: 1299,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80',
    category: 'Kids',
    col_name: 'kids',
    description: 'Creative 300+ piece building blocks toy set for cognitive development.',
    stock: 60
  }
];
