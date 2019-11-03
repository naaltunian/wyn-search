const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    githubUsername: {
        type: String,
        required: true
    },
    personalSite: String,
    bio: {
        type: String,
        required: true
    },
    // skills: [
    //     {
    //         type: String,
    //         enum: ["Node.js", "Javascript", "Express", "Ruby", "Rails", "React", "Python", "GraphQL", "HTML", "CSS"]
    //     }
    // ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);