import React, { createContext, useContext } from "react";
import { useProducts } from "../../hooks/useProducts";

const ProductsContext = createContext<ReturnType<typeof useProducts> | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const productsData = useProducts();
    return (
        <ProductsContext.Provider value={productsData}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProductsContext must be used within a ProductsProvider");
    return context;
}