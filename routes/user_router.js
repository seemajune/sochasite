var express = require('express');
var router = express.Router();
var User = require('../model/user');

var UserRouter = function(module) {
	
	module.list = function(req, res) {
		User.find(function(err, data) {
			if(err) {
				res.send(err);
			}
	      res.json(data);
		});
	};
	
	module.add = function(req, res) {
		console.log('UserRouter/add, email = ' + req.body.email);
		User.find({ email: req.body.email }, function(err, data) {
			if(err) {
				res.send(err);
			}
			console.log('data = ', data);
			if(data.length === 0) {
			    var user = new User({
			    	username: req.body.username,
			    	email: req.body.email
			    });

			    user.save(function(err) {
	                res.send((err === null) ? { msg: '', success: true } : { msg: err, success: false});
			    });
			
			} else {
	            res.send({ msg: 'Sorry, that email address is already registered.', success: false});
			}
		});
	};
	
	module.delete = function(req, res) {
		User.findById(req.params.id, function(err, record) {
			var recordName = record.name;
			User.remove({ _id: req.params._id }, function(err, record) {
				if(err) {
					res.send(err);
				}
		      res.send({ msg: '' });
			});
		});
	};

	return module;
}({});

module.exports = ('UserRouter', UserRouter);
