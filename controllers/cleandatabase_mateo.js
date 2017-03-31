var express = require('express')
  , router = express.Router()
  , Cleandatabase_mateo = require('../models/cleandatabase_mateo')

router.get('/', function(req, res) {
  Cleandatabase_mateo.Cleandatabase_mateoAll(function (err, rows) {
    res.send(rows)
  })
})

module.exports = router