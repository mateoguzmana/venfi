var db = require("../db.js");
var crypto = require("crypto");

exports.Login = function(User, Password, res) {
  db.query('SELECT U.iduser, U.name, U.lastname, U.idrole, R.photo FROM tblvf_users AS U INNER JOIN tblvf_roles AS R ON U.idrole=R.idrole WHERE U.user= ? AND U.password=? AND U.state=1', [User, Password], function(err, rows){
      try {
        if(rows.length>0){
          var token = crypto.createHmac('sha256', "venfiapp").update('pass_activitytech').digest('hex');
          db.query('INSERT INTO tblvf_token (id, token) VALUES (?, ?)', [rows[0].iduser, token]);
          db.query('SELECT sessiontime FROM tblvf_config', function(err, rows2){
            res(null, { state: "1", auth_token: token, id: rows[0].iduser, name: rows[0].name, lastname: rows[0].lastname, photo: rows[0].photo, sessiontime: rows2[0].sessiontime })
          });
        }else{
          res(null, { state: "0"})
        }
      }
      catch (error) {
        console.log(error);
      }
  });
  
}

exports.Unlog = function(id, res) {
  db.query('CALL sp_deletetoken(?)', id, function(err, rows){
    try {
     res(null, { state: "1"}) 
    } 
    catch (error) {
      console.log(error);
    }   
  });
}