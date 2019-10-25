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
    githubUsername: {
        type: String,
        required: true
    },
    personalSite: String,
    bio: {
        type: String,
        required: true
    },
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