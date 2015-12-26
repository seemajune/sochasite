var express = require('express');
var router = express.Router();
var Member = require('../model/member');

var MemberRouter = function(module) {
	
	module.list = function(req, res) {
		Member.find(function(err, data) {
			if(err) {
				res.send(err);
			}
				console.log(data);
	      res.json(data);
		});
	};
	
	module.add = function(req, res) {
		Member.find({ email: req.body.email }, function(err, data) {
			if(err) {
				res.send(err);
			}
			console.log('data = ', data);
			if(data.length === 0) {
			    var member = new Member({
			    	username: req.body.username,
			    	email: req.body.email
			    });

			    member.save(function(err) {
	                res.send((err === null) ? { msg: '', success: true } : { msg: err, success: false});
			    });
			
			} else {
	            res.send({ msg: 'Sorry, that email address is already registered.', success: false});
			}
		});
	};
	
	module.delete = function(req, res) {
		Member.findById(req.params.id, function(err, record) {
			var recordName = record.name;
			Member.remove({ _id: req.params._id }, function(err, record) {
				if(err) {
					res.send(err);
				}
		      res.send({ msg: '' });
			});
		});
	};

	return module;
}({});

module.exports = ('MemberRouter', MemberRouter);
