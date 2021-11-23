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
route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/google/callback', passport.authenticate('google', {  successReturnToOrRedirect: '/',  failureRedirect: '/login', failureFlash : true }));
route.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login/check', failureFlash : true, badRequestMessage: 'Vui lòng nhập tên tài khoản và mật khẩu' }));
module.exports = route;