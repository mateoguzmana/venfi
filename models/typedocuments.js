var db = require("../db.js");

exports.getAllTypeDocuments = function(res) {
  db.query('SELECT idtypedocument, name, listworkflow, type, occupation, state FROM tblvf_typedocuments', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getActiveTypeDocuments = function(res) {
  db.query('SELECT idtypedocument, name, listworkflow FROM tblvf_typedocuments WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getWorkflowTypeDocuments = function(workflow, res) {
  db.query('SELECT idtypedocument, name FROM tblvf_typedocuments WHERE state=1 AND listworkflow LIKE "%'+workflow+'%" AND type=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getWorkflowTypeDocumentsForResponse = function(workflow, res) {
  db.query('SELECT idtypedocument, name FROM tblvf_typedocuments WHERE state=1 AND listworkflow LIKE "%'+workflow+'%" AND type=2', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getTypeDocument = function(id, res) {
  db.query('SELECT idtypedocument, name, photo FROM tblvf_typedocuments WHERE idtypedocument= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.insertTypeDocument = function(name, arraycheck, type, arraycheck2, res) {
  arraycheck  = arraycheck.toString();
  arraycheck2 = arraycheck2.toString();
  db.query('INSERT INTO tblvf_typedocuments (name, listworkflow, type, occupation, state) VALUES (?, ?, ?, ?, 1) ', [name, arraycheck, type, arraycheck2], function(err, rows){
      if (err) throw err;
      res(null, {state: 1})
  });
}

exports.updateTypeDocument = function(idtypedocument, name, arraycheck, type, arraycheck2, res) {
  db.query('UPDATE tblvf_typedocuments SET name= ?, listworkflow= ?, type= ?, occupation= ? WHERE idtypedocument= ? ', [name, arraycheck, type, arraycheck2, idtypedocument], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_typedocuments SET state= ? WHERE idtypedocument= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



