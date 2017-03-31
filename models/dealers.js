var db = require("../db.js");

exports.getAllDealers = function(res) {
  db.query('SELECT iddealer, name, state FROM tblvf_dealers', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getActiveDealers = function(res) {
  db.query('SELECT iddealer, name FROM tblvf_dealers WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getDealer = function(id, res) {
  db.query('SELECT iddealer, name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager FROM tblvf_dealers WHERE iddealer= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.insertDealer = function(name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, res) {
  db.query('INSERT INTO tblvf_dealers (name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', [name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, '1'], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.updateDealer = function(iddealer, name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, res) {
  db.query('UPDATE tblvf_dealers SET name=?, nit=?, namelegal=?, nitlegal=?, nitcommerce=?, rut=?, addresslegal=?, nitmanager=?, namemanager=?, cellmanager=?, phonemanager=?, addressmanager=? WHERE iddealer= ? ', [name, nit, namelegal, nitlegal, nitcommerce, rut, addresslegal, nitmanager, namemanager, cellmanager, phonemanager, addressmanager, iddealer], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_dealers SET state= ? WHERE iddealer= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



