import { Header } from "./Header";
import { ProductFilters } from "../filters/ProductFilters";
import { ProductsTable } from "./ProductsTable";
import { ProductsProvider } from "../../contexts/ProductsContext";

export const Dashboard: React.FC = () => {

    return (
        <ProductsProvider>
            <div className="min-h-screen bg-gray-50">
                <Header />

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ProductFilters />
                    <ProductsTable />
                </main>
            </div>
        </ProductsProvider>
    );
};