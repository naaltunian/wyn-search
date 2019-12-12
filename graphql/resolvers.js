const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/User');

exports.resolvers = {
    Query: {
        // user
        getUser: async (_, { _id }) => {
            const user = await User.findOne({ _id });
            return user;
        },

        getAllUsers: async () => {
            const users = await User.find();
            return users;
        }
    },

    Mutation: {
        // user
        createUser: async (_, { userInput: { name, email, password, githubUsername, bio, skills, personalSite }}) => {
            const user = await User.findOne({ email });
            if(user) throw new Error("User already exists");
            const newUser = await new User({
                name,
                email,
                githubUsername,
                bio,
                skills,
                personalSite,
                password: await bcrypt.hash(password, 10)
            }).save();
            return jwt.sign({ newUser }, process.env.SECRET, { expiresIn: "7d" });
        },

        updateUser: async (_, { _id, userInput: { name, email, githubUsername, bio, personalSite }}) => {
            const user = await User.findByIdAndUpdate({ _id }, { $set: { name, email, githubUsername, bio, personalSite }}, { new: true });
            return user;
        },
        deleteUser: async (_, { _id }) => {
            const deletedUser = await User.findOneAndDelete({ _id });
            return deletedUser;
        },

        // authentication
        login: async(_, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) throw new Error("User not found");
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) throw new Error("Invalid password");

            return jwt.sign({ user }, process.env.SECRET, { expiresIn: "7d" });
        },
    }
}