userModel = require('../models/User');
const BillDAO = require('../repo/BillDAO')
class userInfoController{

    start(req,res,next){
        console.log(req.user)
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
    async userInfoUpdate(req,res,next){
        await userModel.findByIdAndUpdate(req.user._id,{
            name: req.body.profilename,
            phoneNumber: req.body.profilephone,
            email:req.body.profilemail,
        }).exec()
        .then((data)=>{
            if (data){
                res.redirect('/userInfo');
            }else{
                res.render('404');
            }
        })
    }
    async proStatus(req,res,next){
        const userId = req.user._id
        console.log(userId)
        const bills = await BillDAO.findBillById(userId)
        console.log(bills)
        res.render('proStatus', {user: req.user, bills});
    }
    changePass(req,res,next){
        res.render('changePass', {user: req.user});
    }
    proStatusDetail(req,res,next){
        res.render('proStatusDetail', {user: req.user});
    }
    changePass(req,res,next){
        res.render('changePass', {user: req.user });
    }
}

module.exports = new userInfoController;