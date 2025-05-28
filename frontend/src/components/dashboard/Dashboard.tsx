import { Header } from "./Header";
import { ProductFilters } from "../filters/ProductFilters";
import { ProductsTable } from "./ProductsTable";
import { useProducts} from '../../../hooks/useProducts'

export const Dashboard: React.FC = () => {
    const {
        products,
        loading,
        error,
        filters,
        sort,
        updateFilters,
        clearFilters,
        updateSort,
    } = useProducts();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <ProductFilters
                    filters={filters}
                    onFiltersChange={updateFilters}
                    onClearFilters={clearFilters}
                />
                <ProductsTable
                    products={products}
                    loading={loading}
                    error={error}
                    sort={sort}
                    onSort={updateSort}
                />
            </main>
        </div>
    );
};