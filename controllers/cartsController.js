const Cart = require("../model/carts");

const sharedController = require("../controllers/sharedController");


let addToCart = (req, res) => {
    sharedController.insertCarts(req)
    .then((result) => res.send({success: 1, message: 'Successfully added in CART!', result}))
    .catch((e) => res.status(400).send(e))
}

let changeQuantity = (req, res) => {
    let cartId = req.body.cartId.map(c => Number(c));
    let quantity = Number(req.body.quantity);
    quantity = (Number(req.body.increment) ? quantity : -quantity);

    Cart.findOneAndUpdate({"cartId": {$in: cartId}},{$inc: {quantity}},{new:true})
    .select({"_id": 0, "quantity": 1, "cartId": 1, "userId": 1})
    .then((result) => res.send({success: 1, message: 'Successfully change Quantity!', result}))
    .catch((e) => res.status(400).send({success: 0, message: 'Failed to update qauntity'}))
}

let removeFromCart = (req, res) => {
    let cartId = req.body.cartId.map(c => Number(c));
    
    Cart.findOneAndUpdate({"cartId": {$in: cartId}},{$set: {isDeleted: 1}},{new:true})
    .select({"_id": 0, "quantity": 1, "cartId": 1, "userId": 1})
    .then((result) => res.send({success: 1, message: 'Successfully remove from CART!', result}))
    .catch((e) => res.status(400).send({success: 0, message: 'Failed to update qauntity'}))
}

module.exports = {addToCart, changeQuantity, removeFromCart}
