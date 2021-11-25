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
    }
}