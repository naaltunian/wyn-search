import { gql } from 'apollo-boost';

// user
export const CREATE_USER = gql`
mutation createUser($userInput: UserInput!) {
  createUser(userInput: $userInput)
}`;

export const GET_ALL_USERS = gql`
query getAllUsers {
    name
    _id
    email
    dateCreated
}`;

export const GET_CURRENT_USER = gql`
query getCurrentUser {
  getCurrentUser {
  	_id
    name
    email
    githubUsername
    personalSite
    bio
    skills
    dateCreated
    isAdmin
  }
}`;