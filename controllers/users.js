var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')

router.get('/', function(req, res) {
  Users.getAllUsers(function (err, rows) {
    res.send(rows)
  })
})

router.get('/getAllEmails', function(req, res) {
  Users.getAllEmails(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Users.getUser(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  var nit      = req.body.nit;
  var name     = req.body.name;
  var lastname = req.body.lastname;
  var email    = req.body.email;  
  var user     = req.body.user;
  var password = req.body.password;
  var idrole   = req.body.idrole;
  Users.insertUser(nit, name, lastname, email, user, password, idrole, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var iduser     = req.body.iduser;
  var nit        = req.body.nit;
  var name       = req.body.name;
  var lastname   = req.body.lastname;
  var email      = req.body.email;
  var user       = req.body.user;
  var password   = req.body.password;
  var idrole     = req.body.idrole;
  Users.updateUser(iduser, nit, name, lastname, email, user, password, idrole, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Users.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router