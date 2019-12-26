const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/User');

exports.resolvers = {
    Query: {
        // user
        getCurrentUser: async (_, args, context) => {
            if(!context.email) return null;
            const email = context.email;
            const user = await User.findOne({ email });
            console.log("currentuser", user)
            return user;
        },
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
        updateUser: async (_, { _id, userInput: { name, email, githubUsername, bio, personalSite }}, context) => {
            if(!context.email) return null;
            const user = await User.findByIdAndUpdate({ _id }, { $set: { name, email, githubUsername, bio, personalSite }}, { new: true });
            return user;
        },
        deleteUser: async (_, { _id }) => {
            const deletedUser = await User.findOneAndDelete({ _id });
            return deletedUser;
        },
        // authentication
        createUser: async (_, { userInput: { name, email, githubUsername, bio, skills, personalSite }}) => {
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
            return jwt.sign({ email }, process.env.SECRET, { expiresIn: "7d" });
        },
        login: async(_, { email, password }, context) => {
            const user = await User.findOne({ email });
            if(!user) throw new Error("User not found");
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) throw new Error("Invalid password");

            return jwt.sign({ email }, process.env.SECRET, { expiresIn: "7d" });
        },
    }
}