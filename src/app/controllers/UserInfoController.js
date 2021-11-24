class userInfoController{

    start(req,res,next){
        res.render('userInformation');
    }
}

module.exports = new userInfoController;