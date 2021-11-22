//Require route:
const sideRoute = require('./side');
const proManager = require('./proManager');
const client = require('./client');
const loginRouter = require('./login');
const registerRouter = require('./register');
const route = (app)=>{
    app.use('/',client);
    app.use('/manager',proManager);
    app.use('/checkpass',sideRoute);
    app.use('/side',sideRoute);
    app.use('/login',loginRouter);
    app.use('/register',registerRouter);
}

module.exports = route;