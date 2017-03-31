var db = require("../db.js");

/* 
* Clean "TRUNCATE" tables for testing in database 
* Script by Mateo Guzmán 
* Not execute this script on server or in mode production
* Only execute this in local, mode development
*/

exports.Cleandatabase_mateoAll = function(res) {  

    var count = 0;

    var tables = [
        "tblvf_viabilities",
        "tblvf_credits",
        "tblvf_creditreferences",
        "tblvf_workflowhistory",
        "tblvf_responsedocuments",
        "tblvf_references",
        "tblvf_persons",
        "tblvf_notifications",
        "tblvf_documents"
    ];

    for(var i = 0; i < tables.length; i++){

        if(cleanTable(tables[i])){
            count++;
        }

    }

    if(count==tables.length){

        res(null, {message: "Clean database correctly"})

    }

}

cleanTable = function(table){
    
    db.query('TRUNCATE '+table , function(err, rows){
      return true;
    }); 
    
}
