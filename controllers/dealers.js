var express = require('express')
  , router = express.Router()
  , Dealers = require('../models/dealers')

router.get('/', function(req, res) {
  Dealers.getAllDealers(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active', function(req, res) {
  Dealers.getActiveDealers(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Dealers.getDealer(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  
      var name          = req.body.name;
      var nit           = req.body.nit;
      var namelegal     = req.body.namelegal;
      var nitlegal      = req.body.nitlegal;
      var nitcommerce   = req.body.nitcommerce;
      var rut           = req.body.rut;
      var addresslegal  = req.body.addresslegal;
      var nitmanager    = req.body.nitmanager;
      var namemanager   = req.body.namemanager;
      var cellmanager   = req.body.cellmanager;
      var phonemanager  = req.body.phonemanager;
      var addressmanager= req.body.addressmanager;

  Dealers.insertDealer(name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {

      var iddealer      = req.body.iddealer;
      var name          = req.body.name;
      var nit           = req.body.nit;
      var namelegal     = req.body.namelegal;
      var nitlegal      = req.body.nitlegal;
      var nitcommerce   = req.body.nitcommerce;
      var rut           = req.body.rut
      var addresslegal  = req.body.addresslegal;
      var nitmanager    = req.body.nitmanager;
      var namemanager   = req.body.namemanager;
      var cellmanager   = req.body.cellmanager;
      var phonemanager  = req.body.phonemanager;
      var addressmanager= req.body.addressmanager;

  Dealers.updateDealer(iddealer, name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Dealers.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router