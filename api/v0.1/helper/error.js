exports.errorcode = function(req, res, code, message){

  res.json({'error': code, 'message': 'message'});
}
