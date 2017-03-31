var express = require('express')
  , router = express.Router()
  , Workflow = require('../models/workflow')

router.get('/', function(req, res) {
  Workflow.getAllWorkFlow(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active', function(req, res) {
  Workflow.getActiveWorkflow(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Workflow.getWorkflow(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  var name = req.body.name;

  Workflow.insertWorkflow(name, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var idworkflow     = req.body.idworkflow;
  var name           = req.body.name;
  Workflow.updateWorkflow(idworkflow, name, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Workflow.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router