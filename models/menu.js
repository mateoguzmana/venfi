var db = require("../db.js");

exports.getList = function(id, res) {

  var role;

  db.query('SELECT idrole FROM tblvf_users WHERE iduser=?', id, function(err, rows){
    if (err) throw err;
    role = rows[0].idrole;
    //Send Menu to client 
    db.query('SELECT m.idmenu, m.path, m.name, m.icon, p.view FROM tblvf_menus AS m INNER JOIN tblvf_privileges as p ON m.idmenu = p.idmenu WHERE p.view=1 AND p.idrole=? ORDER BY m.position', role, function(err, rows){
    if (err) throw err;
        res(null, rows)
    });
  });


  
}
