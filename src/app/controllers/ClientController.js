
class ClientController{

    async client(req,res,next){
        console.log(req.user);
        res.render('home', {user: req.user});
    }

    productDetail(req,res,next){
        res.render('productDetail');
    }

    productCollection(req,res,next){
        res.render('productCollection');
    }
}

module.exports = new ClientController;