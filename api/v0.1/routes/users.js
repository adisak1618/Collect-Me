var express = require('express');
var router = express.Router();
var middleware = require('./../helper/middleware');

/* GET users listing. */
router.get('/',middleware.isLogin, function(req, res, next) {
  res.send({
    'name':req.userdata.name
  });
});

module.exports = router;
