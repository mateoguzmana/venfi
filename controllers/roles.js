var express = require('express')
  , router = express.Router()
  , Roles = require('../models/roles')
  , multer = require('multer')

router.get('/', function(req, res) {
  Roles.getAllRoles(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active', function(req, res) {
  Roles.getActiveRoles(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Roles.getRole(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', multer({dest: "./uploads/roles/"}).array("uploads[]", 12), function(req, res) {
  var name = req.query.name;

  Roles.insertRole(name, req.files[0], function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadPhoto', multer({dest: "./uploads/roles/"}).array("uploads[]", 12), function(req, res) {
  var id = req.query.id;

  Roles.uploadPhoto(id, req.files[0], function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var idrole = req.body.idrole;
  var name   = req.body.name;
  Roles.updateRole(idrole, name, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Roles.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router