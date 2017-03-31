var db = require("../db.js");

exports.getAllUsers = function(res) {
  db.query('SELECT iduser, nit, name, lastname, state FROM tblvf_users', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getAllEmails = function(res) {
  db.query('SELECT iduser AS id, CONCAT(name," ",lastname," | ",email) AS text FROM tblvf_users WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getUser = function(id, res) {
  db.query('SELECT iduser, nit, name, lastname, email, user, password, idrole FROM tblvf_users WHERE iduser= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.insertUser = function(nit, name, lastname, email, user, password, idrole, res) {
  db.query('INSERT INTO tblvf_users (nit, name, lastname, email, user, password, idrole, state) VALUES (?, ?, ?, ?, ?, ?, ?, 1) ', [nit, name, lastname, email, user, password, idrole], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.updateUser = function(iduser, nit, name, lastname, email, user, password, idrole, res) {
  db.query('UPDATE tblvf_users SET nit=?, name=?, lastname=?, email=?, user=?, password=?, idrole=? WHERE iduser= ? ', [nit, name, lastname, email, user, password, idrole, iduser], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_users SET state= ? WHERE iduser= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



