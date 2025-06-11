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
query Products($filter:ProductFilter, $sort:ProductSort, $limit:Int, $offset:Int){
    products(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
      id
      name
      category
      image
      price
      stock
      createdAt
    }
}
`