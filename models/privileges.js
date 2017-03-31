var db = require("../db.js");

//Get privileges for update and assign new's privileges'
exports.getPrivileges = function(rol, res) {
  db.query('CALL sp_getprivileges(?)', rol, function(err, rows){
    if (err) throw err;
        res(null, rows[0])
  });
  
}

//Query for update privileges
exports.updatePrivileges = function(len, rol, data, res) {
        db.query("DELETE FROM tblvf_privileges WHERE idrole=? ", rol)
        
        for(var i = 0; i < len; i++){

          var check;
          var check2;
          var check3;
          var check4;

          if(data[i].view===true){
            check=1;
          }else{
            check=0;
          }

          if(data[i].enter===true){
            check2=1;
          }else{
            check2=0;
          }

          if(data[i].actualize===true){
            check3=1;
          }else{
            check3=0;
          }

          if(data[i].remove===true){
            check4=1;
          }else{
            check4=0;
          }

          if(data[i].inspect===true){
            check5=1;
          }else{
            check5=0;
          }

          db.query("INSERT INTO tblvf_privileges (idmenu, idrole, view, enter, actualize, remove, inspect) VALUES (?, ?, ?, ?, ?, ?, ?)", 
          [data[i].id, rol, check, check2, check3, check4, check5])
        }
        res(null, {state: 1})
  
}

//Get privileges for component
exports.PrivilegesForComponent = function(iduser, pathx, res) {
  db.query('SELECT idrole FROM tblvf_users WHERE iduser= ?', iduser, function(err, rows){
  if (err) throw err;
  var idrole = rows[0].idrole;
    db.query('SELECT idmenu FROM tblvf_menus WHERE path= ?', pathx, function(err, rows1){
      if (err) throw err;
      var idmenu = rows1[0].idmenu;
      db.query('SELECT view, enter, actualize, remove, inspect FROM tblvf_privileges WHERE idmenu= ? AND idrole= ?', [idmenu, idrole], function(err, rows2){
      if (err) throw err;
          res(null, rows2)
      });
    });
  });
}

