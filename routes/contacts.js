var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    // first param passed to find WHERE x = "something" , 2nd is ? , 3rd is callback func
    collection.find({},{},function(err, data){
        res.json(data);
    });
});

module.exports = router;