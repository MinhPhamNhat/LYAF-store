const proModel = require('../models/Product');

class SideController{

    home(req,res,next){
        res.render('home');
    }

    checkpass(req,res,next){
        // const form = req.body;
        // res.json(form);
        proModel.find({})
                .then((data) =>{
                    res.json(data);
                })
    }

}

module.exports = new SideController;