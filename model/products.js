'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    status: String,
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    title: {
        type: String,
        required: true,
    },
    brand: String,
    description: String,
    manufacturer: String,
    price: Number,
    images: Array
})

const Products = mongoose.model('products', ProductsSchema, 'products');

module.exports = Products;