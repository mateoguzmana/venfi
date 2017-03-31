var express = require('express')
  , router = express.Router()
  , Config = require('../models/config')
  , multer = require('multer')

router.get('/', function(req, res) {
  Config.getConfig(function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadFile', multer({dest: "../uploads/config/"}).array("uploads[]", 12), function(req, res) {
  Config.uploadFile(req.files[0] ,function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var habeasdata = req.body.habeasdata;
  var sessiontime = req.body.sessiontime;
  Config.updateConfig(habeasdata, sessiontime, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router