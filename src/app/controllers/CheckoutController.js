class userInfoController{

    index(req,res,next){
        res.render('checkOut');
    }
}

module.exports = new userInfoController;