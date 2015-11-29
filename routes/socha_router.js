var express = require('express');
var router = express.Router();
var UserRouter = require('./user_router.js');

/* GET home page */
router.route('/')
	.get(function(req, res) {
		// res.send('<h1>hi</h1>');
		res.render('index', { title: 'Socha'});
	});

/* GET list of users */
router.route('/usercollection')
	.get(function(req, res) {
		UserRouter.list(req, res);
	});

/* POST to adduser. */
router.route('/usercollection/adduser')
	.post(function(req, res) {
		UserRouter.add(req, res);
	});
	
/* DELETE to deleteuser. */
router.route('/usercollection/deleteuser/:id')
	.delete(function(req, res) {
		UserRouter.delete(req, res);
	});
	
module.exports = router;
	