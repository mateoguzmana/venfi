var express = require('express')
  , router = express.Router()
  , Login = require('../models/login')

router.post('/', function(req, res) {
  Login.Login(req.body.User, req.body.Password, function (err, rows) {
    res.send(rows)
  })
})
router.put('/', function(req, res) {
  
  var id;

  if(req.body.id){
    id = req.body.id;
  }else{
    id = 0;
  }

  Login.Unlog(id, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router