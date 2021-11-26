userModel = require('../models/User');
class userInfoController{

    start(req,res,next){
        userModel.findById(req.user._id).lean().exec()
        .then(user=> {
            console.log(user)
            if (user)
            res.render('userInformation',{user});
            else
            res.render('404');
        }).catch(err=>{
            res.render('404');
        })
    }
    userInfoUpdate(req,res,next){
        userModel.updateOne({_iq: req.user._id},{
            name: req.body.profilename,
            phoneNumber: req.body.profilephone,
            email:req.body.profilemail,
        }).exec()
        .then((data)=>{
            res.redirect('/userInfo');
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