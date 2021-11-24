const ProductDAO = require('../repo/ProductDAO')
class ClientController{

    async client(req,res,next){
        var result = await ProductDAO.getProductsList({isNew: true},2)
        switch(result.code){
            case 1:
                res.status(200).render('home', {user: req.user, data: result.data});
                break;
            case -1:
                res.status(500).render('404', {user: req.user});
                break;
        }
    }

    productDetail(req,res,next){
        res.render('productDetail');
    }

    productCollection(req,res,next){
        res.render('productCollection');
    }
}

module.exports = new ClientController;