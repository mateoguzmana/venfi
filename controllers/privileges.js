var express = require('express')
  , router = express.Router()
  , Menu = require('../models/privileges')

router.get('/', function(req, res) {
  var rol = req.query.rol

  if(rol){
    Menu.getPrivileges(rol, function (err, rows) {
      res.send(rows)
    })
  }else{
    res.send(false)
  }
})

router.post('/forComponent', function(req, res) {
  var iduser = req.body.check_point;
  var pathx = req.body.path;

  Menu.PrivilegesForComponent(iduser, pathx, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var len = req.body.len; 
  var rol = req.body.rol; 
  var data = req.body.data;

  Menu.updatePrivileges(len, rol, data, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router