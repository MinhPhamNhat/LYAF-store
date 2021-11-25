const ProductDAO = require('../repo/ProductDAO')
class ClientController{

    async client(req,res,next){
        var result = await ProductDAO.getProductsList({isNew: true},10)
        switch(result.code){
            case 1:
                res.status(200).render('home', {user: req.user, data: result.data.map((_)=>_.toObject()), boss: req.params.boss});
                break;
            case -1:
                res.status(500).render('404', {user: req.user});
                break;
        }
    }

    async productDetail(req,res,next){
        var id = req.params.id
        var result = await ProductDAO.findById(id)
        switch(result.code){
            case 1:
                res.status(200).render('productDetail', {user: req.user, data: result.data});
                break;
            case 0:
                res.status(404).render('404', {user: req.user});
                break;
            case -1:
                res.status(500).render('404', {user: req.user});
                break;
        }
    }

    productCollection(req,res,next){
        res.render('productCollection');
    }
}

module.exports = new ClientController;