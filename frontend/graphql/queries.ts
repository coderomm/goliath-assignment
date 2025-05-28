import { gql } from '@apollo/client';

export const ME_QUERY = gql`
query Me {
    me {
        id
        email
    }
}
`

export const PRODUCTS_QUERY = gql`
query Products($filter:ProductFilter, $sort:ProductSort, $limit:Int, $offfset:Int){
    products(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
      id
      name
      category
      price
      stock
      createdAt
    }
}
`