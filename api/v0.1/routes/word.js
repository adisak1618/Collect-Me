var express = require('express');
var router = express.Router();
var middleware = require('./../helper/middleware');
var wordData = require('./../models/words');

router.get('/', middleware.isLogin, function(req, res, next){
  wordData.findOne({'user_id': req.userdata._id},function(err, data){
        if(err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
});

// router.get('/', middleware.isLogin, function(req, res){
//     // wordData.findOne({'user_id': },function(err, data){
//     //   if(err){
//     //     res.send(err);
//     //   }else{
//     //     res.send(data);
//     //   }
//     // });
// });
//word
router.post('/add', middleware.isLogin, function(req, res, next){
  // wordData.findOne({'user_id': req.userdata._id},function(err, data){
  //   if(err){
  //     res.send(err);
  //   }else{
  //     res.send(data);
  //   }
  // });
  // wordData.findOneAndUpdate(
  //   {'user_id': req.userdata._id},
  //   {$addToSet: {words: "dafsfasdf"}},
  //   {upsert: true,strict: false},
  //   function(err, data){
  //       if(err){
  //         res.send(err);
  //       }else{
  //         res.send(data);
  //       }
  //   }
  // );



    var words = JSON.parse(req.body.words);
    if(Array.isArray(words)){
      for(word in words){
        // wordData.findOneAndUpdate(
        //   {'user_id': req.userdata._id,'words.name':{$ne: words[word].name}},
        //   {$addToSet: {words: {name: words[word].name,count: 0,understand: false}}},
        //   {upsert: true},
        //   function(err, data){
        //       if(err){
        //         res.send(err);
        //       }
        //   }
        // );

        wordData.update({'user_id': req.userdata._id, "words.name": {$ne : words[word].name}},
          {
            $addToSet :{"words":{name: words[word].name,count: 0,understand: false}}
          },
          {},
          function(err,data){

          }
        );
        wordData.update({'user_id': req.userdata._id, "words.name": words[word].name},
          {
            $inc :{"words.$.count":1},
            $set :{"words.$.understand": (words[word].understand == 0 ? false : true)}
          },
          false,
          function(err,data){

          }
        );


        // wordData.findOneAndUpdate(
        //   {'user_id': req.userdata._id,'words.name':{$ne: words[word].name}},
        //   {$inc : {"words.$.name" : 1}},
        //   {upsert: true},
        //   function(err, data){
        //
        //   }
        // );

        console.log(words[word]);

        // wordData
        //   .findOne({'user_id':req.userdata._id})
        //   .update({$addToSet: {words: {name: words[word].name,count: 0,understand: false}}},{upsert: false})
        //   .exec(function(err, data){
        //     console.log(data);
        //   });

      }
      res.send('ok');
    }else{
      res.send('err');
    }



});

module.exports = router;
