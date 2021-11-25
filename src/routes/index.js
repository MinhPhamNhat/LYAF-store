//Require route:
const sideRoute = require('./side');
const proManager = require('./proManager');
const client = require('./client');
const loginRouter = require('./login');
const registerRouter = require('./register');
const corlorRouter = require('./color')
const apiRouter = require('./api')
const userInfoRouter = require('./userInfo');
const logoutRouter = require('./logout')
const route = (app)=>{
    app.use('/',client);
    app.use('/manager',proManager);
    app.use('/api',apiRouter);
    app.use('/color',corlorRouter);
    app.use('/checkpass',sideRoute);
    app.use('/side',sideRoute);
    app.use('/login',loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/register',registerRouter);
    app.use('/userInfo',userInfoRouter);
}

module.exports = route;