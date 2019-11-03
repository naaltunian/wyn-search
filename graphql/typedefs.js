const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
# queries
type Query {
    getUser(_id: String!): User!
    getAllUsers: [User!]!
}

# mutations
type Mutation {
    createUser(userInput: UserInput!): User!
    updateUser(_id: String!, userInput: UserInput!): User!
    deleteUser(_id: String!): User!
}

# types
type User {
    _id: ID
    name: String!
    password: String!
    email: String!
    githubUsername: String!
    bio: String!
    skills: [SkillsEnum]
    personalSite: String
    dateCreated: String!
    isAdmin: Boolean
}

# inputs
input UserInput {
    name: String!
    password: String!
    email: String!
    githubUsername: String!
    bio: String!
    skills: [SkillsEnum]
    personalSite: String
}

#  enums

enum SkillsEnum {
    NODEJS
    REACT
    JAVASCRIPT
    EXPRESS
    RUBY
    RAILS
    GRAPHQL
    HTML
    CSS
    PYTHON
}
`