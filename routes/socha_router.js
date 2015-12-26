var express = require('express');
var passport = require('passport');
var router = express.Router();
var MemberRouter = require('./member_router.js');
var Account = require('../model/account');

/* GET home page */
router.route('/')
	.get(function(req, res) {
		console.log("is user? ", req.user);
		res.render('index', { title: 'Socha'});
	});

/* GET list of members IF ADMIN */
router.route('/memberslist')
	.get(function(req, res) {
		if (req.user){
			MemberRouter.list(req, res);
		}
		else {
			res.redirect('/');
		}
	});

router.route('/members')
  .get(function(req, res) {
      res.render('members');
  });

/* POST to adduser. */
router.route('/members/addmember')
	.post(function(req, res) {
		console.log(req.body);
		MemberRouter.add(req, res);
	});
	
/* DELETE to deleteuser. */
router.route('/members/deletemember/:id')
	.delete(function(req, res) {
		MemberRouter.delete(req, res);
	});

/* GET Account Registration Page for Admin --> delete route on deploy */
router.get('/register', function(req, res) {
    res.render('register', { });
});

/* POST to add admin. --> delete route on deploy */
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
    console.log("is user? ", req.user);
    res.redirect('/');
});
	
module.exports = router;
	