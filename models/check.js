var db = require("../db.js");

exports.CheckToken = function(id, token, res) {
  db.query('SELECT token FROM tblvf_token WHERE id= ? AND token= ?', [id, token], function(err, rows){
    try {
      if(rows.length>0){
        res(null, { state: "1", token: rows[0].token})
      }else{
        res(null, { state: "0"})
      } 
    } 
    catch (error) {
      console.log(error);  
    } 
  });
}
