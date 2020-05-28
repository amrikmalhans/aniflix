const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    animeId: [],
    date: {
        type: Date,
        default: Date.now()
    }

});

let User = mongoose.model('User', UserSchema);

module.exports = User;