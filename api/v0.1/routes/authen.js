var express = require('express');
var router = express.Router();
var error = require('./../helper/error');
var crypto = require('./../helper/crypto');
var wordData = require('./../models/words');
var userData = require('./../models/users');
var jwt = require('jsonwebtoken');
//Sign up by email
router.post('/signup',function(req, res, next){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if(name == null && name == ""){
    error.errorcode(req, res, 101);
  }else if(email == null){
    error.errorcode(req, res, 101);
  }else if(password == null){
    error.errorcode(req, res, 101);
  }else{
    var salt = crypto.createSalt();
    var hashPwd = crypto.hashPwd(salt, password);
    // create new user here
    userData.create({
      'name': name,
      'email': email,
      'salt': salt,
      'hash': hashPwd
    },function(err, data){
      if(err){
        res.send(err);
      }else{
        //res.json(data);
        wordData.create({
          user_id: data._id,
          words: []
        },function(err, data){
          if(err){
            res.send(err);
          }else{
            res.json(data);
          }
        });
      }

    });
  }

});
// login route
router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  if(email != null){
    userData.findOne({email:email},function(err, collection){
      if(err){
        res.send(err);
      }else{
        var checkauthen = crypto.checkPWD(collection, password);
        if(checkauthen){
          var token = jwt.sign(checkauthen, 'pbl-collectme');
          res.json({'success':true, name:collection.name, token: token, date: Date.now()});
        }else{
          error.errorcode(req, res, 202);
        }

      }
    });
  }else{
    error.errorcode(req, res, 201);
  }
});


router.get('/signup',function(req, res, next){
  res.send("Adisak");
});

module.exports = router;
