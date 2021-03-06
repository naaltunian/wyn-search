const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
# queries
type Query {
    getCurrentUser: User
    getUser(_id: String!): User!
    getAllUsers: [User!]!
}

# mutations
type Mutation {
    createUser(userInput: UserInput!): String!
    login(email: String!, password: String!): String!
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
    linkedIn: String
    bio: String
    skills: [SkillsEnum]
    personalSite: String
    dateCreated: String!
    isAdmin: Boolean
    photoUrl: String
}

# inputs
input UserInput {
    name: String!
    password: String
    email: String!
    linkedIn: String
    githubUsername: String!
    bio: String
    skills: [SkillsEnum]
    personalSite: String
}

#  enums

enum SkillsEnum {
    NODEJS
    REACT
    GIT
    JQUERY
    JAVASCRIPT
    EXPRESS
    RUBY
    CSHARP
    DOTNET
    GATSBY
    RAILS
    GRAPHQL
    HTML
    PHP
    CSS
    PYTHON
    DJANGO
    FLASK
}
`
