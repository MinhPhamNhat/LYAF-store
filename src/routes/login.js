const express = require('express');
const app = express();
const route = express.Router();
const passport = require('passport');
const LoginController = require('../app/controllers/LoginController');

///////

route.get('/',LoginController.login);
route.get('/success',LoginController. loginSuccess);
route.get('/logout', LoginController.logout);
route.get('/test',LoginController.test);
route.get('/check',LoginController.checkLogin);
route.post('/', passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login/check' }));
module.exports = route;