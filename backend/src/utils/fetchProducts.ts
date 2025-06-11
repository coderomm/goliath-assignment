import fetch from "node-fetch";
import { Product } from '../graphql/generated/graphql'

type FakeProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await res.json() as FakeProduct[];;
    return data.map((item: FakeProduct) => ({
        id: String(item.id),
        name: item.title,
        image: item.image,
        category: item.category,
        price: item.price,
        stock: Math.floor(Math.random() * 100) + 1,
        createdAt: new Date().toISOString(),
    }))
}