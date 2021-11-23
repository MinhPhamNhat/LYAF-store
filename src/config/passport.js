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