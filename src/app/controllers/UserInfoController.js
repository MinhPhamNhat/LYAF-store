userModel = require('../models/User');
class userInfoController{

    start(req,res,next){
        userModel.findById(req.user._id).lean().exec()
        .then(user=> {
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
        })
        .then((data)=>{
            userModel.findById(req.user._id).lean().exec()
            .then(data => {
                 req.login(data, function(err) {
                if (err) { return next(err); }
                return res.redirect('/userInfo');
              });
            })
            .catch(() =>{
                res.render('404');
            });
           
           
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