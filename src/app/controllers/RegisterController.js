const accModel = require('../models/Account');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
class RegisterController{

    accessRegister(req,res,next){
        res.render('register');
    }

    checkRegister(req,res,next){
        const rusername = req.body.rusername;
        const rpassword = req.body.rpassword;
        const rpasswordcheck = req.body.rpasswordcheck;
        var error;
        var placeholder;
       if(rpassword != rpasswordcheck){
           error = 'Xác nhận mật khẩu thất bại !';
           placeholder = rusername;
           res.render('register',{error,placeholder});
       }
        else{
            accModel.findOne({username: rusername}).exec()
            .then((data)=>{
                error = 'Tên đăng nhập đã được sử dụng !';
                placeholder = rusername;
                res.render('register',{error,placeholder});
            })
            .catch(()=>{
                const bcryptpassword = bcrypt.hashSync(rpassword, 10);
            const newacc = new accModel({
                username:rusername,
                password:bcryptpassword
            })
            newacc.save()
                .then(() =>{
                    const newuser = new userModel({
                        username:rusername,
                        name:rusername,
                    })
                    newuser.save()
                            .then(()=>{
                                res.render('login');
                            })
                            .catch()
                }
                    
                )
                .catch(next)
            })
            
        
              
       }
    }
}

module.exports = new RegisterController;