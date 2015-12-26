var express = require('express');
var passport = require('passport');
var router = express.Router();
var UserRouter = require('./user_router.js');
var Account = require('../model/account');

/* GET home page */
router.route('/')
	.get(function(req, res) {
		res.render('index', { title: 'Socha'});
	});

/* GET list of users */
router.route('/users')
	.get(function(req, res) {
		UserRouter.list(req, res);
	});

/* POST to adduser. */
router.route('/users/adduser')
	.post(function(req, res) {
		UserRouter.add(req, res);
	});
	
/* DELETE to deleteuser. */
router.route('/users/deleteuser/:id')
	.delete(function(req, res) {
		UserRouter.delete(req, res);
	});

/* GET Account Registration Page for Admin */
router.get('/register', function(req, res) {
    res.render('register', { });
});

/* POST to addadmin. */
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

/* GET  Login Page for Admin */
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

/* POST TO Login Admin */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

/* GET  Logout Admin */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
	
module.exports = router;
	