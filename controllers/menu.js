var express = require('express')
  , router = express.Router()
  , Menu = require('../models/menu')

router.post('/', function(req, res) {
  Menu.getList(req.body.id, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router