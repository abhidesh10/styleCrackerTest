const sharedController = require("../controllers/sharedController");

let createProducts = (req, res) => {	
    
    sharedController.insertProducts(req.body)
    .then((result) => res.send(result))
    .catch((e) => {
        res.status(400).send(e)
    })
};

let getProducts = (req, res) => {
    
    req.body["status"] = (req.body.type == 'admin' ? req.body.status : ["LIVE"]);
    req.body["skip"] = Number(req.params.pgNo);
    req.body["limit"] = Number(req.params.pgL);

    sharedController.getProductsFilter(req.body)
    .then((result) => {
        if (result.length < 1) return res.send({success: 1, message: 'Filter not found'})
        res.send(result)
    }) 
    .catch((e) => res.status(400).send(e))
}

module.exports = {createProducts, getProducts}
