export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

export const products: Record<string, Product> = {
  "098487957696": {
    id: "water",
    name: "PURIFIED DRINKING WATER 500ml",
    price: 0.99,
    description: "安い水",
    category: "drink",
    imageUrl:
      "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_a8d1cb20-5ce8-479b-b547-36dabaa7316f.jpg",
  },
  "028400199148": {
    id: "lay's",
    name: "Lay's CLASSIC 226.8g",
    price: 4.29,
    description: "塩辛い新鮮なじゃがいも菓子",
    category: "snack",
    imageUrl:
      "https://d13jicmd7uan86.cloudfront.net/9ea343ca-c481-4982-bcea-b3b800cac17f/725?format=webp",
  },
  "049000055375": {
    id: "cocaclola",
    name: "CocaCola 1.25L",
    price: 2.18,
    description: "爽やかで飲みやすいコーラ飲料",
    category: "drink",
    imageUrl:
      "https://i5.walmartimages.com/seo/Coca-Cola-Soda-Pop-1-25-Liters-Bottle_78637dfc-37df-488d-ae4b-6a02d0a22579.e4d04acb4e14c9a2acd3609e289f0c7e.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
  },
  "025000136825": {
    id: "orange",
    name: "Simply Orange 1.36L",
    price: 4.69,
    description: "100%オレンジジュース、天然の味わい",
    category: "drink",
    imageUrl:
      "https://d13jicmd7uan86.cloudfront.net/57d6ff02-1f61-49ec-9002-b2bc00ba2dd9/510?format=webp",
  },
  "850031700185": {
    id: "black-liquid-water",
    name: "Liquid Death SPARKLING DRINKING WATER",
    price: 1.79,
    description: "スパークリングウォーター、爽快感抜群",
    category: "drink",
    imageUrl: "https://placehold.co/100x100?text=LiquidDeath",
  },
  "850031700079": {
    id: "white-liquid-water",
    name: "Liquid Death STILL DRINKING WATER",
    price: 1.79,
    description: "ピュアで清潔な飲料水",
    category: "drink",
    imageUrl: "https://placehold.co/100x100?text=LiquidDeath",
  },
  "61126913344": {
    id: "redblue",
    name: "Red Bull 591ml",
    price: 4.99,
    description: "翼をさずけるエネルギードリンク",
    category: "drink",
    imageUrl: "https://placehold.co/100x100?text=RedBull",
  },
  "00891658001316": {
    id: "fuji-apple",
    name: "Fuji Apple",
    price: 1.59,
    description: "甘くてシャキシャキのフジリンゴ",
    category: "fruits",
    imageUrl: "https://placehold.co/100x100?text=Apple",
  },
};

export const getProductByBarcode = (barcode: string): Product | null => {
  return products[barcode] || null;
};

export const getSimilarProducts = (
  product: Product,
  limit: number = 3,
): Product[] => {
  return Object.values(products)
    .filter(
      (candidate) =>
        candidate.id !== product.id && candidate.category === product.category,
    )
    .sort(
      (a, b) =>
        Math.abs(a.price - product.price) - Math.abs(b.price - product.price),
    )
    .slice(0, limit);
};
