const Carts = require("../model/carts");
const Counter = require("../model/counters");
const Products = require("../model/products");

const globalResponse = require("../response")

let getProductsFilter = (data, selectObject) => {
    return new Promise((resolve, reject) => {

        let findObject = { $and: [{}] }        
        let pagination = {};
        console.log(data.skip,data.limit);
        
        if (data.skip) pagination['skip'] = (data.limit * (data.skip - 1));
        if (data.limit) pagination['limit'] = data.limit;
        if (data.status) findObject.$and.push({ "status": {$in: data.status} })
        if (data.productId) findObject.$and.push({ "productId": {$in: data.productId} })
        if (data.brand) findObject.$and.push({ "brand": {$in: data.brand} })
        if (data.startPrice) findObject.$and.push({ "price": {$gte: data.startPrice} })
        if (data.endPrice) findObject.$and.push({ "price": {$lt: data.endPrice} })
        
        console.log(JSON.stringify(findObject,null,2));
        console.log(JSON.stringify(pagination,null,2));
        Products.find(findObject)
        .select(selectObject)
        .skip((data.limit * (data.skip - 1)))
        .limit(data.limit)
        .then((product) => { resolve(product) })
        .catch((err) => { reject(err.toString()) })
    })
}

let getNextSequenceValue = (param) => {	
    
    return new Promise ((resolve, reject) => {
        Counter.findOneAndUpdate({counterName: param}, {$inc: {counterSeq: 1}},{upsert: true, new: true})
        .then(result => resolve(result))
    })
};

let insertProducts = (param) => {
    
    return new Promise ((resolve, reject) => {
        
        if (param.type == 'user') return reject(globalResponse.accesFail)
        let promise = [];
        for (let i = 0; i < param.length; i++) {
            promise.push(getNextSequenceValue('Products'))
        }
        
        Promise.all(promise)
        .then((getSerial) => {
            for (let i = 0; i < param.length; i++) {
                param[i]['productId'] = getSerial[i].counterSeq
            }
            return Products.insertMany(param)  
        })
        .then((result) => {
            if (result.length < 1) return Promise.reject('Failed to insert');
            resolve({status: 1, message: 'All products successfully inserted'})
        })
        .catch((e) => reject(e))
    })
}

let findProductInCart = async(param) => {
    
    let findObject = { $and: [{}] }        
    
    if (param.userId) findObject.$and.push({ "userId": {$in: param.userId} })
    if (param.cartId) findObject.$and.push({ "cartId": {$in: param.cartId} })
    if (param.product_Id) findObject.$and.push({ 
        "_product": {$in: param.product_Id} 
    })
    if (param.type == 'user') findObject.$and.push({ "isDeleted": 0})

    // console.log(JSON.stringify(findObject,null,2));
    return await Carts.find(findObject) 
}

let insertCarts = async(param) => {
    
        let userDetails = await findProductInCart(param.body)
        
        if (userDetails.length > 0) return({success: 0, message: 'Product already in cart. Please check cart'})
        
        let cartId = await getNextSequenceValue('Carts')
        let cart = new Carts({
            cartId: cartId.counterSeq,
            _user: param.body.userObjId,
            userId: param.body.userId,
            addedTime: toEpoch(new Date()),
            _product: param.body.product_Id,
        });
        
        return await cart.save()       
}

/* Util functions */

let toEpoch = (date) => {
    return parseInt(date.getTime()/1000)
};

module.exports = {getNextSequenceValue, insertProducts, getProductsFilter, insertCarts}
