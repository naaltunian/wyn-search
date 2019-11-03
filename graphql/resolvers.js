const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

exports.resolvers = {
    Query: {

        // user
        getUser: async (_, { _id }, { User }) => {
            const user = await User.findOne({ _id });
            return user;
        },

        getAllUsers: async (_, args, { User }) => {
            const users = await User.find();
            return users;
        }
    },

    Mutation: {

        // user
        createUser: async (_, { userInput: { name, email, password, githubUsername, bio, skills, personalSite }}, { User }) => {
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
            return jsonWebToken.sign({ email }, process.env.SECRET, { expiresIn: "7d" });
        },

        updateUser: async (_, { _id, userInput: { name, email, githubUsername, bio, personalSite }}, { User }) => {
            const user = await User.findByIdAndUpdate({ _id }, { $set: { name, email, githubUsername, bio, personalSite }}, { new:true});
            return user;
            
        },
        deleteUser: async (_, { _id }, { User }) => {
            const deletedUser = await User.findOneAndDelete({ _id });
            return deletedUser;
        },

        // authentication
        login: async(_, { email, password }, { User }) => {
            const user = await User.findOne({ email });
            if(!user) throw new Error("User not found");
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) throw new Error("Invalid password");

            return jsonWebToken.sign({ email }, process.env.SECRET, { expiresIn: "7d" });
        },
    }
}