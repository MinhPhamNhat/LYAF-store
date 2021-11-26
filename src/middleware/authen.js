module.exports = {
    authen: (req, res, next) => {
        req.params.boss = 0;
        if(req.user){
            if(req.user.role == 'user'){
                next();
            }
            else{
              req.params.boss = 1;
              next();
            }
        }else
        next()
    },
    checkChangePass:(req,res,next)=>{
        req.params.error = 0;
        if(req.params.passerror !=null){
            // if(req.params.error == '1'){
            //     console.log('1');
            //     req.params.error = 'Mật khẩu cũ đã sai !';
            //     next();
            // }
            // else{
            //     console.log('2');
            //     req.params.error = 'Xác nhận mật khẩu mới thất bại !';
            //     next();
            // }
            console.log(req.params.passerror);
        }
        else{
            next();
        }
    },
    apiAuthenLogin: (req, res, next)=>{
        if (req.user){
            res.status(200).json({code: 200, message:"Ok"})
        }else{
            res.status(401).json({code: 401, message:"Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng chức năng này"})
        }
    },
    authenLogin2: (req, res, next) => {
        if (req.user){
            res.status(200)
            next()
        }else{
            res.status(404).redirect('/')
        }
    },
    authenLogin3: (req, res, next) => {
        if (req.user){
            res.status(200)
            next()
        }else{
            res.status(401).json({code: 401, message:"Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng chức năng này"})
        }
    }
}