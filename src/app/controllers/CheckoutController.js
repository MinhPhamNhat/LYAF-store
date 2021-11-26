const { parseCart } = require("../../helper/function");
class userInfoController{

    async index(req,res,next){
        var cart = req.cookies.cart;
        var parsedCart = await parseCart(cart);
        var truePrice = parsedCart.reduce((x,y) => x + y.price*y.quantity, 0);
        var salePrice = truePrice - parsedCart.reduce((x,y) => x + y.salePrice*y.quantity, 0);
        var tempPrice = truePrice - salePrice
        var deliveryPrice = (tempPrice - salePrice) > 500 ? 0 : 50; 
        var totalPrice = tempPrice - salePrice + deliveryPrice
        res.render('checkOut', {cart: parsedCart, tempPrice, salePrice, deliveryPrice, totalPrice});
    }
}

module.exports = new userInfoController;