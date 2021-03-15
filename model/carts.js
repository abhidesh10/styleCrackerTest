'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartsSchema = new Schema({
    cartId: {
        type: Number,
        required: true,
        unique: true
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    _product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    userId: Number,
    quantity: {
        type: Number,
        default: 1
    },
    isOrder: Number,
    isDeleted: {
        type: Number,
        default: 0
    },
    addedTime: Number,
    removedTime: Number
})

const Carts = mongoose.model('carts', CartsSchema, 'carts');

module.exports = Carts;