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
        createUser: async (_, { userInput: { name, email, githubUsername, bio, personalSite }}, { User }) => {
            const newUser = await new User({
                name,
                email,
                githubUsername,
                bio,
                personalSite
            }).save();
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