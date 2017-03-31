var db = require("../db.js");

exports.getAllWorkFlow = function(res) {
  db.query('SELECT idworkflow, name, state FROM tblvf_workflow', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getActiveWorkflow = function(res) {
  db.query('SELECT idworkflow, name FROM tblvf_workflow WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getWorkflow = function(id, res) {
  db.query('SELECT idworkflow, name FROM tblvf_workflow WHERE idworkflow= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.insertWorkflow = function(name, res) {
  db.query('INSERT INTO tblvf_workflow (name, state) VALUES (?, 1) ', name, function(err, rows){
      if (err) throw err;
      res(null, {state: 1})
  });
}

exports.updateWorkflow = function(idworkflow, name, res) {
  db.query('UPDATE tblvf_workflow SET name= ? WHERE idworkflow= ? ', [name, idworkflow], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_workflow SET state= ? WHERE idworkflow= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



