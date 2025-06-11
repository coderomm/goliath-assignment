import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import type { FilterFormData, ProductFilter } from '../../../utils/types';
import { useProductsContext } from '../../contexts/ProductsContext';

export const ProductFilters = () => {
    const { filters, updateFilters, clearFilters } = useProductsContext();
    const [formData, setFormData] = useState<FilterFormData>({
        category: '',
        priceMin: '',
        priceMax: '',
        stockMin: '',
    });

    useEffect(() => {
        setFormData({
            category: filters.category || '',
            priceMin: filters.priceMin?.toString() || '',
            priceMax: filters.priceMax?.toString() || '',
            stockMin: filters.stockMin?.toString() || '',
        });
    }, [filters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const filterUpdate: Partial<ProductFilter> = {};

        switch (name) {
            case 'category':
                filterUpdate.category = value;
                break;
            case 'priceMin':
                filterUpdate.priceMin = value ? parseFloat(value) : undefined;
                break;
            case 'priceMax':
                filterUpdate.priceMax = value ? parseFloat(value) : undefined;
                break;
            case 'stockMin':
                filterUpdate.stockMin = value ? parseInt(value) : undefined;
                break;
        }

        updateFilters(filterUpdate);
    };

    const handleClearFilters = () => {
        setFormData({
            category: '',
            priceMin: '',
            priceMax: '',
            stockMin: '',
        });
        clearFilters();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Category"
                    name="category"
                    placeholder="Filter by category"
                    value={formData.category}
                    onChange={handleInputChange}
                />

                <Input
                    label="Min Price"
                    name="priceMin"
                    type="number"
                    placeholder="Minimum price"
                    value={formData.priceMin}
                    onChange={handleInputChange}
                />

                <Input
                    label="Max Price"
                    name="priceMax"
                    type="number"
                    placeholder="Maximum price"
                    value={formData.priceMax}
                    onChange={handleInputChange}
                />

                <Input
                    label="Min Stock"
                    name="stockMin"
                    type="number"
                    placeholder="Minimum stock"
                    value={formData.stockMin}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mt-4">
                <Button
                    variant="secondary"
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </Button>
            </div>
        </div>
    );
};