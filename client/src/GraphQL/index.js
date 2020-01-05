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
    bio
    githubUsername
    skills
    personalSite
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

export const UPDATE_USER = gql`
mutation updateUser($_id: String!, $userInput: UserInput!) {
  updateUser(_id: $_id, userInput: $userInput) {
    name
    personalSite
    isAdmin
    githubUsername
    email
  }
}`