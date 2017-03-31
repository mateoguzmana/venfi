var db = require("../db.js");

exports.getAllRoles = function(res) {
  db.query('SELECT idrole, name, state FROM tblvf_roles', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getActiveRoles = function(res) {
  db.query('SELECT idrole, name FROM tblvf_roles WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getRole = function(id, res) {
  db.query('SELECT idrole, name, photo FROM tblvf_roles WHERE idrole= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.insertRole = function(name, file, res) {
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)

  db.query('INSERT INTO tblvf_roles (name, state) VALUES (?, 1) ', name, function(err, rows){
    db.query('SELECT idrole FROM tblvf_roles ORDER BY idrole DESC LIMIT 1', function(err, rows){
      var idrole = rows[0].idrole;
      var photo = rows[0].idrole+ext;
      var newPath = 'uploads/roles/'+photo;

      db.query('UPDATE tblvf_roles SET photo=? WHERE idrole=?', [photo, rows[0].idrole], function(err, rows){
        if (err) throw err;
        var is = fs.createReadStream(xpath)
        var os = fs.createWriteStream(newPath)

        is.pipe(os)

        is.on('end', function() {
          fs.unlinkSync(xpath)
        })
        
        if (err) throw err;
        res(null, {state: 1, id: idrole })
      });
    });

  });
}

exports.uploadPhoto = function(id, file, res) {
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)

  var photo = id+ext;
  var newPath = 'uploads/roles/'+photo;

      db.query('UPDATE tblvf_roles SET photo=? WHERE idrole=?', [photo, id], function(err, rows){
        if (err) throw err;
        var is = fs.createReadStream(xpath)
        var os = fs.createWriteStream(newPath)

        is.pipe(os)

        is.on('end', function() {
          fs.unlinkSync(xpath)
        })
        
        if (err) throw err;
        res(null, {state: 1})
      });
}

exports.updateRole = function(idrole, name, res) {
  db.query('UPDATE tblvf_roles SET name= ? WHERE idrole= ? ', [name, idrole], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_roles SET state= ? WHERE idrole= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



