const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobileNumber: String,
    version: {
        type: Number,
        default: 1,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },
}, {
    timestamps: true,
    collection: 'users',
});

const user = mongoose.model('user', userSchema);
module.exports = user;