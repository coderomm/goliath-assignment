import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../graphql/queries';
import type { Product, ProductFilter, ProductSort } from '../utils/types';

export const useProducts = () => {
    const [filters, setFilters] = useState<ProductFilter>({});
    const [sort, setSort] = useState<ProductSort>({
        field: 'name',
        order: 'ASC',
    });

    const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY, {
        variables: {
            filter: {
                category: filters.category || undefined,
                priceMin: filters.priceMin || undefined,
                priceMax: filters.priceMax || undefined,
                stockMin: filters.stockMin || undefined,
            },
            sort: {
                field: sort.field,
                order: sort.order,
            },
        },
    });

    const products: Product[] = data?.products || [];

    const updateFilters = (newFilters: Partial<ProductFilter>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    const updateSort = (field: string) => {
        setSort(prev => ({
            field,
            order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC',
        }));
    };

    return {
        products,
        loading,
        error,
        filters,
        sort,
        updateFilters,
        clearFilters,
        updateSort,
        refetch,
    };
};