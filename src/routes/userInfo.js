const express = require('express');
const app = express();
const route = express.Router();
const accModel = require('../app/models/Account');
const userModel = require('../app/models/User');
const authen = require('../middleware/authen')
const UserInfoController = require('../app/controllers/UserInfoController');
route.get('/',
   authen.authenLogin2
,UserInfoController.start);
route.post('/userInfoUpdate',
    authen.authenLogin2
,UserInfoController.userInfoUpdate);
route.get('/proStatus',authen.authenLogin2,UserInfoController.proStatus);
route.get('/proStatus/proStatusDetail/:id',authen.authenLogin2,UserInfoController.proStatusDetail);
route.get('/changePass',
    authen.authenLogin2,
    (req,res,next)=>{
        accModel.findOne({username: req.user._id}).exec()
        .then((data)=>{
            if(data.password ==null){
                res.redirect('/');
            }
            else{
                next();
            }
        })
    }
,UserInfoController.changePass);
route.post('/changePass/done',
    authen.authenLogin2,
    (req,res,next)=>{
        accModel.findOne({username: req.user._id}).exec()
        .then((data)=>{
            if(data.password ==null){
                res.redirect('/');
            }
            else{
                next();
            }
        })
    }
,UserInfoController.changePassDone);
route.get('/addressList', authen.authenLogin2,UserInfoController.addressList);
module.exports = route;