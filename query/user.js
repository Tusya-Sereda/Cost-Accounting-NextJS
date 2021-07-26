import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      place
      cost
    }
  }
`;

export const GET_USER = gql`
  query ($id: ID){
    getUser (id: $id){
      id
      place
      cost
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($input: UserInput) {
    createUser(input: $input) {
      id
      place
      cost
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
      place
      cost
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $place: String, $cost: Int) {
    updateUser(id: $id, place: $place, cost: $cost) {
      id
      place
      cost
    }
  }
`;
