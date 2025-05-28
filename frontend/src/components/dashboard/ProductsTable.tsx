import React from 'react';
import type { Product, ProductSort } from '../../../utils/types';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProductsTableProps {
    products: Product[];
    loading: boolean;
    error?: Error | null;
    sort: ProductSort;
    onSort: (field: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
    products,
    loading,
    error,
    sort,
    onSort,
}) => {
    const getSortIcon = (field: string) => {
        if (sort.field !== field) return '';
        return sort.order === 'ASC' ? ' ↑' : ' ↓';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
                <div className="text-center">
                    <div className="text-red-600 mb-2">⚠️</div>
                    <p className="text-red-600">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
                <div className="text-center">
                    <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => onSort('name')}
                            >
                                Name{getSortIcon('name')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => onSort('category')}
                            >
                                Category{getSortIcon('category')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => onSort('price')}
                            >
                                Price{getSortIcon('price')}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => onSort('stock')}
                            >
                                Stock{getSortIcon('stock')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                                    }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {product.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">
                                        {product.category}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">
                                        {formatCurrency(product.price)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">
                                        {product.stock}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {formatDate(product.createdAt)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};