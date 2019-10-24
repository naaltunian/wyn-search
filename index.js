const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typedefs');
const { resolvers } = require('./graphql/resolvers');
const mongoose = require('mongoose');
require('dotenv').config();

// models
const User = require('./Models/User');

const app = express();

// database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// graphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User
    }
});
// apply graphQL middleware
server.applyMiddleware({ app })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}${server.graphqlPath}`));