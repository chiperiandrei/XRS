const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 4
    },
    lastname: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        min: 3,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOperator: {
        type: Boolean,
        default: false
    },
    nfcToken: {
        type: String,
        default: null
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userModel);
