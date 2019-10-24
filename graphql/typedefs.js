const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
# queries
type Query {
    User(_id: String!): User
    # getAllUsers: [User!]!
}

# mutations
# type Mutation {
#     # createUser(userInput: UserInput!) User
#     # deleteUser(_id: String!): User
# }

# types
type User {
    _id: ID
    name: String!
    email: String!
    githubUserName: String!
    bio: String!
    personalSite: String
    dateCreated: String!
    isAdmin: Boolean
}

# inputs
# type UserInput {
#     name: String!
#     email: String!
#     githubUserName: String!
#     bio: String!
#     personalSite: String
# }
`