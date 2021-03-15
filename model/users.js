'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    phone: String,
    type: {
        type: String,
        default: "user",
        // enum: ["user", "admin"]
    }
})

const Users = mongoose.model('users', UsersSchema, 'users');

module.exports = Users;