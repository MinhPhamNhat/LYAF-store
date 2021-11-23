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

//Local
passport.use(new LocalStrategy(
    function (req,username,password,done) {
        if(username && password){
            accModel.findOne({
                username : username
            }).exec()
            .then((data) => {
                if(data == null){
                    req.flash('error','Tài khoản không hợp lệ !');
                    return(null,false);
                }
                else if(bcrypt.compareSync(password, data.password)){
                        userModel.findOne({username: username}).exec()
                        .then((user) =>{
                            return done(null, user);
                        })
                
                    }
                else{
                    req.flash('error','Mật khẩu không hợp lệ !');
                    return done(null,false);
                    }   
                    
                })
               
            .catch(function (err) {
                return done(err);
            })
        }
        else{
            req.flash('error','Tài khoản hoăc mật khẩu đang trống');
            return done(null,false);
        }
       
    })
)
//End Local

//Facebook
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//End Facebook