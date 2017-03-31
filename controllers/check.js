var express = require('express')
  , router = express.Router()
  , Check = require('../models/check')

router.post('/', function(req, res) {
  Check.CheckToken(req.body.id, req.body.token, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router