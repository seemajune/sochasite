var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection'); //usercollection is table in db called sochasite in mongodb
    // first param passed to find WHERE x = "something" , 2nd is ? , 3rd is callback func
    collection.find({},{},function(err, data){
        res.json(data);
    });
});

/* POST to adduser. */
router.post('/adduser', function(req, res) {
    var db = req.db;
    console.log(req.body);
    var collection = db.get('usercollection');
    collection.insert(req.body, function(err, result){
        console.log("error: " , err)
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    var userToDelete = req.params.id;
    // console.log("userToDelete: " + userToDelete);
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;