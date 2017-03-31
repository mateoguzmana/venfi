var express = require('express')
  , router = express.Router()
  , TypeDocuments = require('../models/typedocuments')

router.get('/', function(req, res) {
  TypeDocuments.getAllTypeDocuments(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active', function(req, res) {
  TypeDocuments.getActiveTypeDocuments(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active/:workflow', function(req, res) {
  var workflow = req.params.workflow;
  TypeDocuments.getWorkflowTypeDocuments(workflow, function (err, rows) {
    res.send(rows)
  })
})

router.get('/ActiveForResponse/:workflow', function(req, res) {
  var workflow = req.params.workflow;
  TypeDocuments.getWorkflowTypeDocumentsForResponse(workflow, function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  TypeDocuments.getTypeDocument(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  var name        = req.body.name;
  var arraycheck  = req.body.arraycheck;
  var type        = req.body.type;
  var arraycheck2 = req.body.arraycheck2;

  TypeDocuments.insertTypeDocument(name, arraycheck, type, arraycheck2, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var idtypedocument = req.body.idtypedocument;
  var name           = req.body.name;
  var arraycheck     = req.body.arraycheck;
  var type           = req.body.type;
  var arraycheck2    = req.body.arraycheck2;

  TypeDocuments.updateTypeDocument(idtypedocument, name, arraycheck, type, arraycheck2, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  TypeDocuments.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router