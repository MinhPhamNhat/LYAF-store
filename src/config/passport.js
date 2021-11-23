const accModel = require('../app/models/Account');
const userModel = require('../app/models/User');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user
    , done) {
    done(null,user);
});

passport.use(new LocalStrategy(
    function (username,password,done) {
        accModel.findOne({
            username : username
        }).exec()
        .then((data) => {
            if(bcrypt.compareSync(password, data.password)){
                    userModel.findOne({username: username}).exec()
                    .then((user) =>{
                        return done(null, user);
                    })
            
                }
                else{
                    return done(null,false);
                }   
                
            })
           
        .catch(function (err) {
            return done(err);
        })
    })
)