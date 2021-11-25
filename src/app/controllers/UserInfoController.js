class userInfoController{

    start(req,res,next){
        res.render('userInformation');
    }
    proStatus(req,res,next){
        res.render('proStatus');
    }
    changePass(req,res,next){
        res.render('changePass');
    }
    proStatusDetail(req,res,next){
        res.render('proStatusDetail');
    }
    changePass(req,res,next){
        res.render('changePass');
    }
}

module.exports = new userInfoController;