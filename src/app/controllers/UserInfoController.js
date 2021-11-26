userModel = require('../models/User');
const BillDAO = require('../repo/BillDAO')
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
    changePass(req,res,next){
        if(req.params.error != null){
            if(req.params.error == 1){
                res.render('changePass',{error:'Mật khẩu cũ đã sai !'});
            }
            else if(req.params.error == 2){
                res.render('changePass',{error:'Xác nhận mật khẩu thất bại !'});
            }
        }
        else{
            res.render('changePass');
        }
        
    }
    changePassDone(req,res,next){
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
                        req.params.error = 1;
                        res.redirect('/userInfo/changePass');
                    }
                }
                else{
                    req.params.error = 1;
                    res.redirect('/userInfo/changePass');
                }
              
            })
        }
        else{
            res.send('opp !');
        }
    }
}

module.exports = new userInfoController;