var express = require('express')
  , router = express.Router()
  , Notifications = require('../models/notifications')

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Notifications.getAllNotifications(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active/:id', function(req, res) {
  var id = req.params.id;
  Notifications.getActiveNotifications(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/Detail/:id', function(req, res) {
  var id = req.params.id;
  Notifications.getNotification(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/ViabilityInfo/:id', function(req, res) {
  var id = req.params.id;
  Notifications.getViabilityInfo(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/ViabilityInfo2/:id', function(req, res) {
  var id = req.params.id;
  Notifications.getViabilityInfo2(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/CreditInfo/:id/:idworkflow/:notification', function(req, res) {
  var id           = req.params.id;
  var idworkflow   = req.params.idworkflow;
  var notification = req.params.notification;
  idworkflow       = (idworkflow-1);
  
  Notifications.getCreditInfo(id, idworkflow, notification, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  var name = req.body.name;

  Notifications.insertNotification(name, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Notifications.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router