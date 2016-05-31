var jwt = require('jsonwebtoken');
factory = {};
factory.isLogin = function(req, res, next){
  token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, 'pbl-collectme', function(err, decoded) {
  if(err){
    res.status(403).json({
      code:403,
      message:'Unauthorized'
    });
  }else if(decoded){
    //console.log(decoded);
    req.userdata = decoded._doc;
    next();
  }else{
    res.status(403).json({
      code:403,
      message:'Unknow Error!!!'
    });
  }

});
}

module.exports = factory;
