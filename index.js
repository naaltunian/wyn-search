const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typedefs');
const { resolvers } = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');
const profilePicRoutes = require("./Routes/ProfilePic");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// JWT token middleware
app.use(async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if(bearerToken) {
        try {
            const token = bearerToken.split(" ")[1];
            const currentUser = await jwt.verify(token, process.env.SECRET);
            console.log("middleware", currentUser)
            req.currentUser = currentUser;
        } catch(err) {
            console.log("middlware error", err)
        }
    }
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/", profilePicRoutes);

// database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// graphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const user = req.currentUser;
        return user;

    }
});
// apply graphQL middleware
server.applyMiddleware({ app, cors: false})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
