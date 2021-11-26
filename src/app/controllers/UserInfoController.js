userModel = require('../models/User');
const BillDAO = require('../repo/BillDAO');
const bcrypt = require("bcrypt");
const { parseCart } = require("../../helper/function");
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
        const bills = await BillDAO.findBillById(userId)
        res.render('proStatus', {user: req.user, bills});
    }
    async proStatusDetail(req,res,next){
        const billId = req.params.id
        const userId = req.user._id
        const result = await BillDAO.getBillDetail(userId, billId)
        switch (result.code) {
            case 1:
                result.data.billDetail = await parseCart(result.data.billDetail)
                console.log(result.data)
                res.render('proStatusDetail', {user: req.user, data: result.data});
                break;
            case 0:
                res.render('404');
                break;
            case -1:
                res.render('404');
                break;
          }
    }
    async changePass(req,res,next){
    
            res.render('changePass',{error: req.params.error});
        
    }
    async changePassDone(req,res,next){
        var oldpass = req.body.oldpass;
        const newpass = req.body.newpass;
        const newpasscheck = req.body.newpasscheck;
        if(oldpass && newpass && newpasscheck){
            accModel.findOne({username : req.user._id}).exec()
            .then((data) =>{
                if(bcrypt.compareSync(oldpass, data.password)){
                    if(newpass == newpasscheck){
                        const bcryptpassword = bcrypt.hashSync(newpass, 10);
                        accModel.findByIdAndUpdate(data._id,{
                            password: bcryptpassword,
                        }).exec()
                        .then(()=>{
                            res.redirect('/');
                        })
                    }
                    else{
                        res.redirect('/userInfo/changePass?error=2');
                    }
                }
                else{
                   
                    res.redirect('/userInfo/changePass?error=1');
                }
              
            })
        }
        else{
            res.send('opp !');
        }
    }
}

module.exports = new userInfoController;