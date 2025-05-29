import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
mutation Login($email:String!,$password:String!){
    Login(email:$email,password:$password){
        user{
            id
            email
        }
        token
    }
}
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    Logout
  }
`;