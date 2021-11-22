const accModel = require('../models/Account');
class RegisterController{

    accessRegister(req,res,next){
        res.render('register');
    }

    checkRegister(req,res,next){
        const rusername = req.body.rusername;
        const rpassword = req.body.rpassword;
        const rpasswordcheck = req.body.rpasswordcheck;

       if(rpassword != rpasswordcheck){
           const error = `Xác nhận mật khẩu thất bại !`;
           const placeholder = rusername;
           res.render('register',{error,placeholder});
       }
       else{

       }
    }
}

module.exports = new RegisterController;