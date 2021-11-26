userModel = require('../models/User');
class userInfoController{

    start(req,res,next){
        const user = req.user;
        res.render('userInformation',{user});
    }
    userInfoUpdate(req,res,next){
        userModel.updateOne({_iq:req.user._id},{
            name: req.body.profilename,
            phoneNumber: req.body.profilephone,
            email:req.body.profilemail,

        }).exec()
        .then(()=>{
            res.render('userInformation',{user: req.user});
        })
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