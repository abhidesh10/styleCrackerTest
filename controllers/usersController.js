const Cart = require("../model/carts");

let viewCart = (req, res) => {
    
    Cart.find({userId: req.body.userId, isDeleted: 0})
    .populate('_product')
    .select({"_id": 0, "quantity": 1, "cartId": 1, "userId": 1, "_product": 1})
    .then((result) => {
        if (result.length < 1) return Promise.reject({success: 0, message: 'Cart is empty'})

        let productQty = result.map(ca => Number(ca.quantity)).reduce((sum, value) => sum + value, 0);
        let cartAmount = result.map(ca => (Number(ca._product.price) * ca.quantity)).reduce((sum, value) => sum + value, 0);
        let shipping = (cartAmount < 1000 ? 100 : 0);
        let tax = (cartAmount * 0.18);
        let finalCartValue = (cartAmount + shipping + tax);
        
        res.send({
            productDetails: result,
            cartDetails: {productQty, cartAmount, shipping, tax, finalCartValue}
        })
    })
    .catch((e) => res.status(400).send(e))
}

module.exports = {viewCart}
