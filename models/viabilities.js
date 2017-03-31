var db  = require("../db.js");


exports.getAllViabilities = function(id, res) {
  db.query('SELECT idviability, idcredit, date, nit, name, state FROM tblvf_viabilities WHERE consultant=? ORDER BY idviability DESC', id, function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getAllViabilities2 = function(res) {
  db.query('SELECT idviability, idcredit, date, nit, name, state FROM tblvf_viabilities WHERE state=1 ORDER BY idviability DESC', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getViability = function(id, res) {
  db.query('SELECT V.idviability, V.date, V.agreement, D.name AS nameagreement, V.consultant,  CONCAT(U.name," ",U.lastname) AS consultantname, V.vehiclevalue, V.quotas, V.vehiclereference, V.vehiclemodel, V.invoicevalue, V.nit, V.name, V.birthdate, V.occupation, V.income, V.nitcodebtor, V.namecodebtor, V.incomecodebtor, V.note, V.file FROM tblvf_viabilities AS V INNER JOIN tblvf_users AS U ON V.consultant=U.iduser INNER JOIN tblvf_dealers AS D ON V.agreement=D.iddealer WHERE idviability= ?', id, function(err, rows){
    if (err) throw err;
    db.query('SELECT habeasdata FROM tblvf_config', id, function(err, rows2){
      if(rows[0]){
          rows[0]["habeasdata"] = rows2[0].habeasdata;
          res(null, rows[0])
      }else{
        res(null)
      }
    });
  });
}

exports.insertViability = function(date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, res) {

  CheckNit(nit, function(err, resp){
    if(resp.state){
      res(null, {state: 2})
    }else{
      db.query('INSERT INTO tblvf_viabilities (date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1) ', [date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor], function(err, rows){
        if (err) throw err;
        insertNofication(nit);
        res(null, {state: 1})
      });
    }
  });
}

exports.cloneViability = function(date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, res) {

  CheckNit(nit, function(err, resp){
    if(resp.state){
      res(null, {state: 2})
    }else{
      db.query('INSERT INTO tblvf_viabilities (date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1) ', [date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor], function(err, rows){
      if (err) throw err;
        db.query('SELECT idviability FROM tblvf_viabilities WHERE nit=? AND state=1', nit, function(err, rows){
          if (err) throw err;
          insertNofication(nit);
          res(null, {state: 1, idviability: rows[0].idviability})
        });
      });
    }
  });
}

exports.updateViability = function(idviability, date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, res) {

  db.query('UPDATE tblvf_viabilities SET date=?, agreement=?, consultant=?, vehiclevalue=?, quotas=?, vehiclereference=?, vehiclemodel=?, invoicevalue=?, nit=?, name=?, birthdate=?, occupation=?, income=?, nitcodebtor=?, namecodebtor=?, incomecodebtor=? WHERE idviability= ? ',
  [date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, idviability], 
  function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });

}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_viabilities SET state= ? WHERE idviability= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.uploadFile = function(id, file, res) {
    
   var fs = require('fs')
   var path = require('path')

  
   var xpath = file.path
   var ext  = path.extname(file.originalname)
   var name = id+ext
   var newPath = 'uploads/viabilities/1/'+name

   db.query('UPDATE tblvf_viabilities SET file= ? WHERE idviability= ? ', [name, id], function(err, rows){
    if (err) throw err;
      var is = fs.createReadStream(xpath)
      var os = fs.createWriteStream(newPath)

      is.pipe(os)

      is.on('end', function() {
        fs.unlinkSync(xpath)
      })
      res(null, {state: 1})
    });
}

exports.uploadFile2 = function(id, file, res) {
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)

  var photo = id+ext;
  var newPath = 'uploads/viabilities/2/'+photo;

      db.query('UPDATE tblvf_viabilities SET file2=? WHERE idviability=?', [photo, id], function(err, rows){
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

CheckNit = function(nit, res){
  db.query('SELECT idviability FROM tblvf_viabilities WHERE nit=? AND state=1', nit, function(err, rows){
    if (err) throw err;
    if(rows.length>0){
      res(null, { state: true })
    }else{
      res(null, { state: false })
    }
  });
}

insertNofication = function(nit){
  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT idviability FROM tblvf_viabilities WHERE nit=? AND state=1 ORDER BY idviability ASC', nit, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, 1) ', 
      [1, rows[0].idviability, 0, 3, 0, "Tiene una viabilidad pendiente por revisar.", datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });
}


