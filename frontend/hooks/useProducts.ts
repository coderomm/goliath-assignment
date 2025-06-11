import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../graphql/queries';
import type { Product, ProductFilter, ProductSort } from '../utils/types';

export const useProducts = () => {
    const [productState, setProductState] = useState<{
        filters: ProductFilter,
        sort: ProductSort
    }>({
        filters: {},
        sort: {
            field: 'name',
            order: 'ASC',
        }
    })

    const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY, {
        variables: {
            filter: {
                category: productState.filters.category || undefined,
                priceMin: productState.filters.priceMin || undefined,
                priceMax: productState.filters.priceMax || undefined,
                stockMin: productState.filters.stockMin || undefined,
            },
            sort: {
                field: productState.sort.field,
                order: productState.sort.order,
            },
        },
    });

    const products: Product[] = data?.products || [];

    const updateFilters = (newFilters: Partial<ProductFilter>) => {
        setProductState(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                ...newFilters
            }
        }))
    };

    const clearFilters = () => {
        setProductState(prev => ({
            ...prev,
            filters: {}
        }));
    };

    const updateSort = (field: string) => {
        setProductState(prev => ({
            ...prev,
            sort: {
                field,
                order: prev.sort.field === field && prev.sort.order === 'ASC' ? 'DESC' : 'ASC'
            }
        }))
    };

    return {
        products,
        loading,
        error,
        filters: productState.filters,
        sort: productState.sort,
        updateFilters,
        clearFilters,
        updateSort,
        refetch,
    };
};