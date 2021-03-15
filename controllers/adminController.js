const Products = require("../model/products");

const globalResponse = require("../response")


let editProduct = (req, res) => {
    if (req.body.type == 'user') return res.send(globalResponse.accesFail)
    
    let productId = req.body.productId.map(p => Number(p));
    let setParam = {};

    if (Number(req.body.quantity)) setParam['quantity'] = Number(req.body.quantity);
    if ((req.body.status)) setParam['status'] = (req.body.status);
    if ((req.body.title)) setParam['title'] = (req.body.title);
    if ((req.body.brand)) setParam['brand'] = (req.body.brand);
    if (Number(req.body.price)) setParam['price'] = Number(req.body.price);
    
    Products.updateMany({
        "productId": {$in: productId}
    }, {
        $set: setParam,
    })
    .then((result) => {
        if (result.nModified < 1) return Promise.reject({success: 0, message: 'Failed to edit'})
        res.send({success: 1, message: 'Successfully modified produts'})
    }) 
    .catch((e) => res.status(400).send(e))
}

module.exports = {editProduct}
