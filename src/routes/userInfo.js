const express = require('express');
const app = express();
const route = express.Router();
const UserInfoController = require('../app/controllers/UserInfoController');
route.get('/',
    (req,res,next)=>{
        if(req.user == null){
            res.redirect('/');
        }
        else{
            next();
        }
    }
,UserInfoController.start);
route.post('/userInfoUpdate',UserInfoController.userInfoUpdate);
route.get('/proStatus',UserInfoController.proStatus);
route.get('/proStatus/proStatusDetail',UserInfoController.proStatusDetail);
route.get('/changePass',UserInfoController.changePass);
route.post('/changePass/done',UserInfoController.changePassDone);
module.exports = route;