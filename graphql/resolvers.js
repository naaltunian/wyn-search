exports.resolvers = {
    Query: {
        User: async (_, { _id }, { User }) => {
            const user = await User.findOne({ _id: userId });
            return user;
        }
    }
}