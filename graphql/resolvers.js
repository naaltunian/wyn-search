const bcrypt = require('bcrypt');

exports.resolvers = {
    Query: {
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
        createUser: async (_, { userInput: { name, email, password, githubUsername, bio, personalSite }}, { User }) => {
            const user = await User.findOne({ name });
            if(user) {
                throw new Error("User already exists");
            }
            const newUser = await new User({
                name,
                email,
                githubUsername,
                bio,
                personalSite
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = salt;
                    newUser.save();
                });
            });
            return newUser;
        },
        updateUser: async (_, { _id, userInput: { name, email, githubUsername, bio, personalSite }}, { User }) => {
            const user = await User.findByIdAndUpdate({ _id }, { $set: { name, email, githubUsername, bio, personalSite }}, { new:true});
            console.log(user)
            return user;
            
        },
        deleteUser: async (_, { _id }, { User }) => {
            const deletedUser = await User.findOneAndDelete({ _id });
            return deletedUser;
        }
    }
}