var db = require("../db.js");

exports.getAllNotifications = function(id, res) {
   db.query('SELECT idrole FROM tblvf_users WHERE state=1 AND iduser=?', id, function(err, rows){
     switch(rows[0].idrole){

       case 2: 
          db.query('SELECT idnotification, idtypeapplication, idapplication, idworkflow, message, date FROM tblvf_notifications WHERE idtypeconsultant=2 AND idconsultant=? ORDER BY idnotification DESC', id, function(err, rows2){
            if (err) throw err;
            res(null, rows2)
          });
          break;

      case 3: 
          db.query('SELECT idnotification, idtypeapplication, idapplication, idworkflow, message, date FROM tblvf_notifications WHERE idtypeconsultant=3 ORDER BY idnotification DESC', function(err, rows2){
            if (err) throw err;
            res(null, rows2)
          });
          break;

      default: 
          res(null, {state: 0})
          break;
     }
   });
}

exports.getActiveNotifications = function(id, res) {
   db.query('SELECT idrole FROM tblvf_users WHERE state=1 AND iduser=?', id, function(err, rows){
     switch(rows[0].idrole){

       case 2: 
          db.query('SELECT idnotification, idtypeapplication, idapplication, idworkflow, message, date FROM tblvf_notifications WHERE state=1 AND idtypeconsultant=2 AND idconsultant=? ORDER BY idnotification DESC', id, function(err, rows2){
            if (err) throw err;
            res(null, rows2)
          });
          break;

      case 3: 
          db.query('SELECT idnotification, idtypeapplication, idapplication, idworkflow, message, date FROM tblvf_notifications WHERE state=1 AND idtypeconsultant=3 ORDER BY idnotification DESC', function(err, rows2){
            if (err) throw err;
            res(null, rows2)
          });
          break;

      default: 
          res(null, [])
          break;
     }
   });
}

exports.getNotification = function(id, res) {
  db.query('SELECT idnotification, idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date FROM tblvf_notifications WHERE idnotification= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.getViabilityInfo = function(id, res) {
  db.query('SELECT idviability FROM tblvf_credits WHERE idcredit= ?', id, function(err, rows){
    db.query('SELECT note, file2 FROM tblvf_viabilities WHERE idviability= ?', rows[0].idviability, function(err, rows2){
      if (err) throw err;
      res(null, rows2[0])
    });
  });  
}

exports.getViabilityInfo2 = function(id, res) {
  db.query('SELECT note FROM tblvf_viabilities WHERE idviability= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.getCreditInfo = function(id, idworkflow, notification, res) {
  db.query('SELECT R.idresponsedocument, R.idtypedocument, T.name, R.path FROM tblvf_responsedocuments AS R INNER JOIN tblvf_typedocuments AS T ON R.idtypedocument=T.idtypedocument WHERE R.idcredit=? AND R.workflow=? AND R.state=1', [id, idworkflow], function(err, rows){
    db.query('SELECT message FROM tblvf_notifications WHERE idnotification= ?', notification, function(err, rows2){
      if (err) throw err;

      var messagecomplete = rows2[0].message;
      messagecomplete = messagecomplete.split("||||");

      var message1 = messagecomplete[0];
      var message2 = messagecomplete[1];
      
      res(null, {files: rows, message1: message1, message2: message2 })
    });
  });
}

exports.insertNotification = function(idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, res) {
  db.query('INSERT INTO tblvf_notifications (idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, 1) ', name, function(err, rows){
      if (err) throw err;
      res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_notifications SET state= ? WHERE idnotification= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}



