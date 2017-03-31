var express = require('express')
  , router = express.Router()
  , Messages = require('../models/messages')

router.get('/All/:idsender', function(req, res) {
  var idsender = req.params.idsender;
  Messages.getAllMessages(idsender, function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Messages.getMessage(id, function (err, rows) {
    res.send(rows)
  })
})


router.post('/', function(req, res) {
  
  var idsender  = req.body.idsender;
  var emails    = req.body.emails;
  var subject   = req.body.subject; 
  var message   = req.body.message;

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  Messages.insertMessage(idsender, emails, subject, message, datecomplete, function (err, rows) {
    res.send(rows)
  }) 
  
})

router.post('/Draft', function(req, res) {
  
  var idsender  = req.body.idsender;
  var emails    = req.body.emails;
  var subject   = req.body.subject; 
  var message   = req.body.message;

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  Messages.draftMessage(idsender, emails, subject, message, datecomplete, function (err, rows) {
    res.send(rows)
  }) 
  
})

router.post('/getUsersEmail', function(req, res) {

  var id = req.body.id;
  
  Messages.getUsersEmail(id, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  
  var idmessage = req.body.idmessage;
  var emails    = req.body.emails;
  var subject   = req.body.subject; 
  var message   = req.body.message;

  Messages.updateMessage(idmessage, emails, subject, message, function (err, rows) {
    res.send(rows)
  })
})

router.put('/deleteMessages', function(req, res) {
  
  var id = req.body.id;

  Messages.deleteMessages(id, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Messages.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router