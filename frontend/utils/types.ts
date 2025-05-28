export interface User {
    id: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    createdAt: string;
}

export interface ProductFilter {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
}

export interface ProductSort {
    field: string;
    order: 'ASC' | 'DESC';
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface FilterFormData {
    category: string;
    priceMin: string;
    priceMax: string;
    stockMin: string;
}export interface User {
    id: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    createdAt: string;
}

export interface ProductFilter {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
}

export interface ProductSort {
    field: string;
    order: 'ASC' | 'DESC';
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface FilterFormData {
    category: string;
    priceMin: string;
    priceMax: string;
    stockMin: string;
}