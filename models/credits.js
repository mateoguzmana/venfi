var db = require("../db.js");
var async = require("async");

exports.getAllCredits = function(res) {
  db.query('SELECT C.idcredit, C.iddebtor, C.workflow, C.state, P.nit, P.name FROM tblvf_credits AS C INNER JOIN tblvf_persons AS P ON C.iddebtor=P.idperson ORDER BY C.idcredit DESC', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getAllCreditsForInspect = function(res) {
  db.query('SELECT C.idcredit, C.iddebtor, C.workflow, C.state, P.nit, P.name FROM tblvf_credits AS C INNER JOIN tblvf_persons AS P ON C.iddebtor=P.idperson WHERE C.state=2 ORDER BY C.idcredit DESC', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getActiveCredits = function(res) {
  db.query('SELECT idcredit, iddebtor FROM tblvf_credits WHERE state=1', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getDocumentsForResponse = function(id, workflow, res) {
  db.query('SELECT D.idresponsedocument, D.idcredit, D.idtypedocument, D.workflow, D.path, T.name AS typedocument FROM tblvf_responsedocuments AS D INNER JOIN tblvf_typedocuments AS T ON D.idtypedocument=T.idtypedocument WHERE D.idcredit=? AND D.workflow=? AND D.state=1', [id, workflow], function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getCredit = function(id, resp) {
  LoadDataCredit(id, function(err, res){
      resp(null, res.data)
  });
}

exports.validateCredit = function(id, resp) {
  var v = false;
  var arr = [];
  var count = 0;
  LoadDataCredit(id, function(err, res){ //Load data of database credits, debtor and codebtors
      //console.log(res.data);
      
      // Validate credit data
      res.data.quotas!="" ? arr.push(true) : arr.push(false);
      
      //Validate debtor data 
      res.data.debtor.name                !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.occupation          !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.address             !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.cell                !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.phone1              !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.phone2              !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.email               !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.company             !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.monthlyincome       !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.monthlyexpenses     !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.otherincome         !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.actives             !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.liabilities         !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.patrimony           !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.otherincomeconcept  !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.namereference       !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.phonereference      !="" ? arr.push(true) : arr.push(false);
      res.data.debtor.observations        !="" ? arr.push(true) : arr.push(false);

      //Validate debtor documents
      /*validateDocuments(res.data.idcredit, res.data.workflow, res.data.debtor.idperson, function(err, rowx){
          if(rowx){
            arr.push(true);
          }else{
            arr.push(false);
          }
      }); */
      
      //Validate codebtors data
      for(var i = 0; i < res.data.codebtors.length; i++){
        res.data.codebtors[i].namecodebtor                !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].nitcodebtor                 !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].occupationcodebtor          !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].addresscodebtor             !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].cellcodebtor                !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].phone1codebtor              !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].phone2codebtor              !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].emailcodebtor               !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].companycodebtor             !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].monthlyincomecodebtor       !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].monthlyexpensescodebtor     !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].otherincomecodebtor         !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].activescodebtor             !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].liabilitiescodebtor         !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].patrimonycodebtor           !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].otherincomeconceptcodebtor  !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].namereferencecodebtor       !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].phonereferencecodebtor      !="" ? arr.push(true) : arr.push(false);
        res.data.codebtors[i].observationscodebtor        !="" ? arr.push(true) : arr.push(false);
          
          //Begin coment this code when you want validate documents
          count++;
          
          if(count==res.data.codebtors.length){

            // Validate if in array exist a value false
            if(arr.includes(false)){
              v = false;
            }else{
              v = true;
            }
            
            //Send response "true" or "false"
            resp(null, v);
          }
          //End

        //Validate codebtors documents
        /*validateDocuments(res.data.idcredit, res.data.workflow, res.data.codebtors[i].idcodebtor, function(err, rown){
          count++; //Prevent async data 
          if(rown){
            arr.push(true);
          }else{
            arr.push(false);
          } 

          //When query complete execute this
          if(count==res.data.codebtors.length){

            // Validate if in array exist a value false
            if(arr.includes(false)){
              v = false;
            }else{
              v = true;
            }
            
            //Send response "true" or "false"
            resp(null, v);
          }
        }); */
      }
  });
}

validateDocuments = function(idcredit, workflow, idperson, res){
  var v = false;
  var arr = [];
  var count = 0;
  var long  = 0;

  db.query('SELECT idtypedocument FROM tblvf_typedocuments WHERE state=1 AND listworkflow LIKE "%'+workflow+'%"', function(err, rows){
    if (err) throw err;
    long = rows.length;
    for(var i = 0; i < long; i++){
      db.query("SELECT iddocument FROM tblvf_documents WHERE idcredit=? AND idperson=? AND idtypedocument=? AND state=1", [idcredit, idperson, rows[i].idtypedocument], function(err, rows2){
        count++;
        
        if(rows2!=""){
           arr.push(true);
        }else{
           arr.push(false);
        }
          if(count==long){
            if(arr.includes(false)){
              v = false;
            }else{
              v = true;
            }
            res(null, v);
          }
      });
    }
  }); 
}

exports.SendCredit = function(idcredit, res) {
  db.query('UPDATE tblvf_credits SET state=2 WHERE idcredit=?', idcredit, function(err, rows){
    if (err) throw err;
    insertNoficationForSendCredit(idcredit);
    res(null, { state: 1 })
  });
}

exports.StepTwo = function(idcredit, quotas, debtor, codebtors, resp) {
   UpdateDataCredit(quotas, idcredit, function(err, res){
      UpdateDebtor(debtor, function(err, res){
        DeleteCreditReferences(idcredit, function(err, res){
          UpdateCodebtors(codebtors, idcredit, function(err, res){
            resp(null, {state: 1})
          });
        });  
      });
   });
}

exports.updateCredit = function(idcredit, nitdebtor, res) {
  db.query('UPDATE tblvf_credits SET nitdebtor= ? WHERE idcredit= ? ', [nitdebtor, idcredit], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.uploadDocument = function(credit, id, type, file, res) {
    
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)
   
   db.query('INSERT INTO tblvf_documents (idcredit, idtypedocument, idperson, state) VALUES (?, ?, ?, 1)', [credit, type, id], function(err, rows){
    if (err) throw err;
    db.query('SELECT D.iddocument, D.idcredit, D.idtypedocument, D.idperson, D.path, T.name AS typedocument FROM tblvf_documents AS D INNER JOIN tblvf_typedocuments AS T ON D.idtypedocument=T.idtypedocument ORDER BY D.iddocument DESC LIMIT 1', function(err, rows){
      if (err) throw err;
      var datadocument = rows[0]; 
      var name = rows[0].iddocument+ext;
      var newPath = 'uploads/credits/documents/'+name;

      datadocument["path"] = name;

      db.query('UPDATE tblvf_documents SET path=? WHERE iddocument=?', [name, rows[0].iddocument], function(err, rows){
        if (err) throw err;
        var is = fs.createReadStream(xpath)
        var os = fs.createWriteStream(newPath)

        is.pipe(os)

        is.on('end', function() {
          fs.unlinkSync(xpath)
        })
        
        res(null, {state: 1, data: datadocument})
      });
    });
  });
}

exports.uploadDocumentForResponse = function(credit, type, workflow, file, res) {
    
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)
   
   db.query('INSERT INTO tblvf_responsedocuments (idcredit, idtypedocument, workflow, state) VALUES (?, ?, ?, 1)', [credit, type, workflow], function(err, rows){
    if (err) throw err;
    db.query('SELECT D.idresponsedocument, D.idcredit, D.idtypedocument, D.workflow, D.path, T.name AS typedocument FROM tblvf_responsedocuments AS D INNER JOIN tblvf_typedocuments AS T ON D.idtypedocument=T.idtypedocument ORDER BY D.idresponsedocument DESC LIMIT 1', function(err, rows){
      if (err) throw err;
      var datadocument = rows[0]; 
      var name = rows[0].idresponsedocument+ext;
      var newPath = 'uploads/credits/responsedocuments/'+name;

      datadocument["path"] = name;

      db.query('UPDATE tblvf_responsedocuments SET path=? WHERE idresponsedocument=?', [name, rows[0].idresponsedocument], function(err, rows){
        if (err) throw err;
        var is = fs.createReadStream(xpath)
        var os = fs.createWriteStream(newPath)

        is.pipe(os)

        is.on('end', function() {
          fs.unlinkSync(xpath)
        })
        
        res(null, {state: 1, data: datadocument})
      });
    });
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_credits SET state= ? WHERE idcredit= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.approveViability = function(id, nit, name, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, note, finalvalue, safevalue, resp) {
  db.query('UPDATE tblvf_viabilities SET note=?, finalvalue=?, safevalue=?, state=2 WHERE idviability=? ', [note, finalvalue, safevalue, id], function(err, rows){
    if (err) throw err;
      checkingPerson(nit, function(err, res){
        if(res.state){
          insertCredit(id, res.idperson, function(err, res){
            insertNotificationApproveViability(id, res.idcredit);
            insertWorkflowHistory(res.idcredit, 1);
            insertViabilityCodebtor(nitcodebtor, namecodebtor, incomecodebtor, function(err, res){
              resp(null, {state: 1})
            })
          });
        }else{
          insertPerson(nit, name, occupation, income, function(err, res){
            insertCredit(id, res.idperson, function(err, res){
              insertNotificationApproveViability(id, res.idcredit);
              insertWorkflowHistory(res.idcredit, 1);
              insertViabilityCodebtor(nitcodebtor, namecodebtor, incomecodebtor, function(err, res){
                resp(null, {state: 1})
              })
            });
          });
        }
      });
  });
}

exports.rejectViability = function(id, nit, note, resp) {
  db.query('UPDATE tblvf_viabilities SET note=?, state=3 WHERE idviability=? ', [note, id], function(err, rows){
    if (err) throw err;
    insertNotificationRejectViability(id);
    resp(null, {state: 1})
  });
}

exports.DeleteDocument = function(id, resp) {
  db.query('UPDATE tblvf_documents SET state=0 WHERE iddocument=?', id, function(err, rows){
    if (err) throw err;
    resp(null, {state: 1})
  });
}

exports.DeleteDocumentForResponse = function(id, resp) {
  db.query('UPDATE tblvf_responsedocuments SET state=0 WHERE idresponsedocument=?', id, function(err, rows){
    if (err) throw err;
    resp(null, {state: 1})
  });
}

exports.approveCredit = function(idcredit, note, workflow, resp) {
  var newworkflow = (workflow+1);
  
  lastWorkflow(function(err, res){
  if(workflow==res){ //If credit has that is finished

      db.query('UPDATE tblvf_credits SET state=3 WHERE idcredit=?', idcredit, function(err, rows){
        if (err) throw err;

        finishWorkflowHistory(idcredit, workflow);
        insertNotificationFinishCredit(idcredit, note);
        resp(null, { state: 1 })

      });
    
  }else{ // If credit has a next step
    
      db.query('UPDATE tblvf_credits SET state=1, workflow=? WHERE idcredit=?', [newworkflow, idcredit], function(err, rows){
        if (err) throw err;

        finishWorkflowHistory(idcredit, workflow);
        insertWorkflowHistory(idcredit, newworkflow);
        insertNotificationApproveCredit(idcredit, note);
        resp(null, { state: 1 })

      });

    }
  })
}

exports.rejectCredit = function(idcredit, note, resp) {
  db.query('UPDATE tblvf_credits SET state=1 WHERE idcredit=?', idcredit, function(err, rows){
    if (err) throw err;
    insertNotificationRejectCredit(idcredit, note);
    resp(null, { state: 1 })
  });
}

insertCredit = function(viability, id, resp) {
  LoadViabilityData(viability, function(err, res){
    var date = new Date().toISOString().slice(0,10);
    db.query('INSERT INTO tblvf_credits (idviability, iddebtor, consultant, agreement, value, safevalue, quotas, date, workflow, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1) ', [viability, id, res.consultant, res.agreement, res.finalvalue, res.safevalue, res.quotas, date], function(err, rows){
      if (err) throw err;
      db.query('SELECT idcredit FROM tblvf_credits WHERE idviability=?', viability, function(err, rows){
        if (err) throw err;
        var idcredit = rows[0].idcredit;
        db.query('UPDATE tblvf_viabilities SET idcredit=? WHERE idviability=?', [idcredit, viability], function(err, rows){
        if (err) throw err;
        resp(null, {state: 1, idcredit: idcredit})
        });
      });
    });
  });
}

insertPerson = function(nit, name, occupation, income, resp) {
  db.query('INSERT INTO tblvf_persons (nit, name, occupation, monthlyincome, state) VALUES (?, ?, ?, ?, 1) ', [nit, name, occupation, income], function(err, rows){
    if (err) throw err;
    db.query('SELECT idperson FROM tblvf_persons WHERE nit=?', nit, function(err, rows){
      if (err) throw err;
      resp(null, {state: 1, idperson: rows[0].idperson})
    });
  });
}

insertPerson2 = function(codebtor, resp) {
  db.query('INSERT INTO tblvf_persons (nit, name, occupation, address, cell, phone1, phone2, email, company, monthlyincome, monthlyexpenses, otherincome, actives, liabilities, patrimony, otherincomeconcept, namereference, phonereference, observations, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1) ', [codebtor.nitcodebtor, codebtor.namecodebtor, codebtor.occupationcodebtor, codebtor.addresscodebtor, codebtor.cellcodebtor, codebtor.phone1codebtor, codebtor.phone2codebtor, codebtor.emailcodebtor, codebtor.companycodebtor, codebtor.monthlyincomecodebtor, codebtor.monthlyexpensescodebtor, codebtor.otherincomecodebtor, codebtor.activescodebtor, codebtor.liabilitiescodebtor, codebtor.patrimonycodebtor, codebtor.otherincomeconceptcodebtor, codebtor.namereferencecodebtor, codebtor.phonereferencecodebtor, codebtor.observationscodebtor], function(err, rows){
    if (err) throw err;
    db.query('SELECT idperson FROM tblvf_persons WHERE nit=?', codebtor.nitcodebtor, function(err, rows){
      if (err) throw err;
      resp(null, {state: 1, idperson: rows[0].idperson})
    });
  });
}

insertPerson3 = function(codebtor, resp) {
  db.query('INSERT INTO tblvf_persons (nit, name, monthlyincome, state) VALUES (?, ?, ?, 1) ', [codebtor.nitcodebtor, codebtor.namecodebtor, codebtor.incomecodebtor], function(err, rows){
    if (err) throw err;
    db.query('SELECT idperson FROM tblvf_persons WHERE nit=?', codebtor.nitcodebtor, function(err, rows){
      if (err) throw err;
      resp(null, {state: 1, idperson: rows[0].idperson})
    });
  });
}

checkingPerson = function(nit, res){
  db.query('SELECT idperson FROM tblvf_persons WHERE nit= ?', nit, function(err, rows){
    if (err) throw err;
      if(rows.length>0){
        res(null, {state: true, idperson: rows[0].idperson});
      }else{
        res(null, {state: false});
      }
  });
}

checkingCreditActive = function(id, res){
  db.query('SELECT idcredit FROM tblvf_credits WHERE iddebtor= ? AND state=1', id, function(err, rows){
    if (err) throw err;
      if(rows.length>0){
        res(null, {state: true, idcredit: rows[0].idcredit});
      }else{
        res(null, {state: false});
      }
    });
}

LoadDataCredit = function(id, res){
  var data;
  db.query('SELECT C.idcredit, C.iddebtor, C.consultant, C.agreement, D.name AS nameagreement, C.value, C.safevalue, C.quotas, C.date, C.workflow, CONCAT(U.name," ",U.lastname) AS nameconsultant FROM tblvf_credits AS C INNER JOIN tblvf_users AS U ON C.consultant=U.iduser INNER JOIN tblvf_dealers AS D ON C.agreement=D.iddealer WHERE idcredit=?', id, function(err, rows){
    if (err) throw err;
      data = rows[0];
      if(data){
        db.query('SELECT idperson, nit, name, occupation, address, cell, phone1, phone2, email, company, monthlyincome, monthlyexpenses, otherincome, actives, liabilities, patrimony, otherincomeconcept, namereference, phonereference, observations FROM tblvf_persons WHERE idperson=?', rows[0].iddebtor, function(err, rows){
        if (err) throw err;
          data["debtor"] = rows[0];
          db.query('SELECT D.iddocument, D.idcredit, D.idtypedocument, D.idperson, D.path, T.name AS typedocument FROM tblvf_documents AS D INNER JOIN tblvf_typedocuments AS T ON D.idtypedocument=T.idtypedocument WHERE D.idperson=? AND D.idcredit=? AND D.state=1', [data["debtor"]["idperson"], id],  function(err, rows){
          if (err) throw err;
          data["debtor"]["documents"] = rows;  
            LoadCodebtors(data.idcredit, function(err, resp){
                data["codebtors"] = resp.codebtors;
                res(null, { state: true, data: data });
            });
          });
        });
      }else{
         res(null, { state: false });
      }
  });
}

LoadCodebtors = function(id, res){
    var codebtors = [];

    db.query('SELECT CR.idreference, C.idperson FROM tblvf_creditreferences AS CR INNER JOIN tblvf_references AS C ON CR.idreference=C.idreference WHERE CR.idcredit=?', id, function(err, rows){
    if (err) throw err;
      if(rows.length>0){
        //If codebtors, send all codebtors
        var onComplete = function() {
          res(null, {state: true, codebtors: codebtors });
        };
        var tasksToGo = rows.length;
        if (tasksToGo === 0) {
          onComplete();
        } else {
          for(var i=0; i<rows.length; i++){
            db.query('SELECT idperson, name, nit, occupation, address, cell, phone1, phone2, email, company, monthlyincome, monthlyexpenses, otherincome, actives, liabilities, patrimony, otherincomeconcept, namereference, phonereference, observations FROM tblvf_persons WHERE idperson=?', rows[i].idperson, function(err, rows){
              if (err) throw err;
              var datacodebtor = {idcodebtor: rows[0].idperson, namecodebtor: rows[0].name, nitcodebtor: rows[0].nit, occupationcodebtor: rows[0].occupation, addresscodebtor: rows[0].address, cellcodebtor: rows[0].cell, phone1codebtor: rows[0].phone1, phone2codebtor: rows[0].phone2, emailcodebtor: rows[0].email, companycodebtor: rows[0].company, monthlyincomecodebtor: rows[0].monthlyincome, monthlyexpensescodebtor: rows[0].monthlyexpenses, otherincomecodebtor: rows[0].otherincome, activescodebtor: rows[0].actives, liabilitiescodebtor: rows[0].liabilities, patrimonycodebtor: rows[0].patrimony, otherincomeconceptcodebtor: rows[0].otherincomeconcept, namereferencecodebtor: rows[0].namereference, phonereferencecodebtor: rows[0].phonereference, observationscodebtor: rows[0].observations};
                db.query('SELECT D.iddocument, D.idcredit, D.idtypedocument, D.idperson, D.path, T.name AS typedocument FROM tblvf_documents AS D INNER JOIN tblvf_typedocuments AS T ON D.idtypedocument=T.idtypedocument WHERE D.idperson=? AND D.idcredit=? AND D.state=1', [rows[0].idperson, id], function(err, rows){
                if (err) throw err;
                  datacodebtor["documents"] = rows;
                  codebtors.push(datacodebtor);
                    if (--tasksToGo === 0) {
                        onComplete();
                    }
              });
            });
          }
        }
      }else{
        //If codebtors is null, send empty value
        res(null, {state: false, codebtors: [{namecodebtor: "", nitcodebtor:"", occupationcodebtor:"", addresscodebtor: "", cellcodebtor: "", phone1codebtor: "", phone2codebtor: "", emailcodebtor: "", companycodebtor: "", monthlyincomecodebtor: "", monthlyexpensescodebtor: "", otherincomecodebtor: "", activescodebtor: "", liabilitiescodebtor: "", patrimonycodebtor: "", otherincomeconceptcodebtor: "", namereferencecodebtor: "", phonereferencecodebtor: "", observationscodebtor: ""}] });
      }
    });
        
}

//Update data
UpdateDebtor = function(debtor, res){
  db.query('UPDATE tblvf_persons SET name=?, occupation=?, address=?, cell=?, phone1=?, phone2=?, email=?, company=?, monthlyincome=?, monthlyexpenses=?, otherincome=?, actives=?, liabilities=?, patrimony=?, otherincomeconcept=?, namereference=?, phonereference=?, observations=? WHERE idperson=?', [debtor.name, debtor.occupation, debtor.address, debtor.cell, debtor.phone1, debtor.phone2, debtor.email, debtor.company, debtor.monthlyincome, debtor.monthlyexpenses, debtor.otherincome, debtor.actives, debtor.liabilities, debtor.patrimony, debtor.otherincomeconcept, debtor.namereference, debtor.phonereference, debtor.observations, debtor.idperson], function(err, rows){
    if (err) throw err;
      res(null, {state: true});
  });
}

UpdateCodebtors = function(codebtors, idcredit, res){
  var onComplete = function() {
    res(null, {state: true});
  };
  
  var tasksToGo = codebtors.length;
  
  if (tasksToGo === 0) {
    onComplete();
  } else {
      for(var i=0; i<codebtors.length; i++){
        if(codebtors[i].idcodebtor){
          UpdateExistingCodebtor(codebtors[i], function(err, resp){
            AddReference(resp.idcodebtor, idcredit, function(err, resp){
              if (--tasksToGo === 0) {
                  onComplete();
              }
            });
          });
        }else{
          CheckExistCodebtor(codebtors[i], function(err, resp){
            if(resp.state){
              UpdateExistingCodebtor2(resp.codebtor, resp.idperson, function(err, resp){
                AddReference(resp.idcodebtor, idcredit, function(err, resp){
                  if (--tasksToGo === 0) {
                  onComplete();
                }
              });
            });
            }else{
              insertPerson2(resp.codebtor, function(err, resp){
                AddReference(resp.idperson, idcredit, function(err, resp){
                  if (--tasksToGo === 0) {
                    onComplete();
                  }
                });
              });
            }
          });
        }
      }
  }
}

CheckExistCodebtor = function (codebtor, res){
  db.query('SELECT idperson FROM tblvf_persons WHERE nit=?', codebtor.nitcodebtor, function(err, rows){
  if (err) throw err;
    if(rows.length>0){
      res(null, {state: true, codebtor: codebtor, idperson: rows[0].idperson})
    }else{
      res(null, {state: false, codebtor: codebtor})
    }
  });
};

UpdateExistingCodebtor = function(codebtor, res){
  db.query('UPDATE tblvf_persons SET nit=?, name=?, occupation=?, address=?, cell=?, phone1=?, phone2=?, email=?, company=?, monthlyincome=?, monthlyexpenses=?, otherincome=?, actives=?, liabilities=?, patrimony=?, otherincomeconcept=?, namereference=?, phonereference=?, observations=? WHERE idperson=?', [codebtor.nitcodebtor, codebtor.namecodebtor, codebtor.occupationcodebtor, codebtor.addresscodebtor, codebtor.cellcodebtor, codebtor.phone1codebtor, codebtor.phone2codebtor, codebtor.emailcodebtor, codebtor.companycodebtor, codebtor.monthlyincomecodebtor, codebtor.monthlyexpensescodebtor, codebtor.otherincomecodebtor, codebtor.activescodebtor, codebtor.liabilitiescodebtor, codebtor.patrimonycodebtor, codebtor.otherincomeconceptcodebtor, codebtor.namereferencecodebtor, codebtor.phonereferencecodebtor, codebtor.observationscodebtor, codebtor.idcodebtor], function(err, rows){
    res(null, {state: true, idcodebtor: codebtor.idcodebtor});
  });
}

UpdateExistingCodebtor2 = function(codebtor, idperson, res){
  db.query('UPDATE tblvf_persons SET nit=?, name=?, occupation=?, address=?, cell=?, phone1=?, phone2=?, email=?, company=?, monthlyincome=?, monthlyexpenses=?, otherincome=?, actives=?, liabilities=?, patrimony=?, otherincomeconcept=?, namereference=?, phonereference=?, observations=? WHERE idperson=?', [codebtor.nitcodebtor, codebtor.namecodebtor, codebtor.occupationcodebtor, codebtor.addresscodebtor, codebtor.cellcodebtor, codebtor.phone1codebtor, codebtor.phone2codebtor, codebtor.emailcodebtor, codebtor.companycodebtor, codebtor.monthlyincomecodebtor, codebtor.monthlyexpensescodebtor, codebtor.otherincomecodebtor, codebtor.activescodebtor, codebtor.liabilitiescodebtor, codebtor.patrimonycodebtor, codebtor.otherincomeconceptcodebtor, codebtor.namereferencecodebtor, codebtor.phonereferencecodebtor, codebtor.observationscodebtor, idperson], function(err, rows){
    res(null, {state: true, idcodebtor: idperson});
  });
}

UpdateExistingCodebtor3 = function(codebtor, idperson, res){
  db.query('UPDATE tblvf_persons SET nit=?, name=?, monthlyincome=? WHERE idperson=?', [codebtor.nitcodebtor, codebtor.namecodebtor, codebtor.monthlyincomecodebtor, idperson], function(err, rows){
    res(null, {state: true, idcodebtor: idperson});
  });
}

AddReference = function(codebtor, idcredit, res){
  db.query('SELECT idreference FROM tblvf_references WHERE idperson=?', codebtor, function(err, rows){
    if(rows.length>0){
      db.query('INSERT INTO tblvf_creditreferences (idcredit, idreference, state) VALUES (?, ?, 1)', [idcredit, rows[0].idreference], function(err, rows){
        res(null, {state: true});
      });
    }else{
      db.query('INSERT INTO tblvf_references (idperson, idtypereference, state) VALUES (?, 1, 1)', codebtor, function(err, rows){
        db.query('SELECT idreference FROM  tblvf_references WHERE idperson=?', codebtor, function(err, rows){
          db.query('INSERT INTO tblvf_creditreferences (idcredit, idreference, state) VALUES (?, ?, 1)', [idcredit, rows[0].idreference], function(err, rows){
            res(null, {state: true});
          });
        });
      });
    }
  });
}

DeleteCreditReferences = function(idcredit, res){
  db.query('DELETE FROM tblvf_creditreferences WHERE idcredit=?', idcredit, function(err, rows){
    res(null, {state: true});
  });
}

LoadViabilityData = function(id, res){
  db.query('SELECT agreement, consultant, finalvalue, safevalue, quotas FROM tblvf_viabilities WHERE idviability= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  })
}

UpdateDataCredit = function(quotas, idcredit, res){
  db.query('UPDATE tblvf_credits SET quotas=? WHERE idcredit=?', [quotas, idcredit], function(err, rows){
    res(null, {state: true});
  });
}

insertViabilityCodebtor = function(nitcodebtor, namecodebtor, incomecodebtor, res){
  var codebtor = {};
  codebtor["nitcodebtor"]    = nitcodebtor;
  codebtor["namecodebtor"]   = namecodebtor;
  codebtor["incomecodebtor"] = incomecodebtor;

  db.query('SELECT idcredit FROM tblvf_credits ORDER BY idcredit DESC LIMIT 1', function(err, rows){
  var idcredit = rows[0].idcredit;

  var onComplete = function() {
    res(null, {state: true});
  };
  
  var tasksToGo = 1;

          CheckExistCodebtor(codebtor, function(err, resp){
            if(resp.state){
              UpdateExistingCodebtor3(resp.codebtor, resp.idperson, function(err, resp){
                AddReference(resp.idcodebtor, idcredit, function(err, resp){
                  if (--tasksToGo === 0) {
                  onComplete();
                }
              });
            });
            }else{
              insertPerson3(resp.codebtor, function(err, resp){
                AddReference(resp.idperson, idcredit, function(err, resp){
                  if (--tasksToGo === 0) {
                    onComplete();
                  }
                });
              });
            }
          });

  });
}

insertWorkflowHistory = function(idcredit, idworkflow) {
  var initialdate = new Date().toISOString().slice(0,10);

  db.query('INSERT INTO tblvf_workflowhistory (idcredit, idworkflow, initialdate, state) VALUES (?, ?, ?, 1) ', [idcredit, idworkflow, initialdate], function(err, rows){
    if (err) throw err;
  });
}

finishWorkflowHistory = function(idcredit, idworkflow){
  var finaldate = new Date().toISOString().slice(0,10);

  db.query('UPDATE tblvf_workflowhistory SET finaldate=? WHERE idcredit=? AND idworkflow=? ', [finaldate, idcredit, idworkflow], function(err, rows){
    if (err) throw err;
  });
}

lastWorkflow = function (res){
  db.query('SELECT MAX(idworkflow) AS idworkflow FROM tblvf_workflow', function(err, rows){
    if (err) throw err;
    res(null, rows[0].idworkflow); 
  });
}

insertNotificationApproveViability = function(idviability, idcredit){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant FROM tblvf_viabilities WHERE idviability=?', idviability, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ', 
      [1, 2, idcredit, 0, 2, rows[0].consultant, "Se ha aprobado una viabilidad.", datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });
}

insertNotificationRejectViability = function(idviability){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant FROM tblvf_viabilities WHERE idviability=?', idviability, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ', 
      [2, 1, idviability, 0, 2, rows[0].consultant, "Se ha rechazado una viabilidad.", datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });

}

insertNotificationApproveCredit = function(idcredit, note){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant, workflow FROM tblvf_credits WHERE idcredit=?', idcredit, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ', 
      [1, 2, idcredit, rows[0].workflow, 2, rows[0].consultant, "Se ha aprobado un paso del crédito.||||"+note, datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });

}

insertNotificationRejectCredit = function(idcredit, note){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant, workflow FROM tblvf_credits WHERE idcredit=?', idcredit, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ', 
      [2, 2, idcredit, rows[0].workflow, 2, rows[0].consultant, "Se ha rechazado un paso del crédito.||||"+note, datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });

}

insertNoficationForSendCredit = function(idcredit){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant, workflow FROM tblvf_credits WHERE idcredit=?', idcredit, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, 1) ', 
      [2, idcredit, rows[0].workflow, 3, 0, "Tiene un crédito por revisar.", datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  }); 

}

insertNotificationFinishCredit = function(idcredit, note){

  var date = new Date().toISOString().slice(0,10);
  var hour = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes();
  var datecomplete = date+" "+hour;

  db.query('SELECT consultant, workflow FROM tblvf_credits WHERE idcredit=?', idcredit, function(err, rows){

      db.query('INSERT INTO tblvf_notifications (idtypenotification, idtypeapplication, idapplication, idworkflow, idtypeconsultant, idconsultant, message, date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ', 
      [1, 2, idcredit, 100, 2, rows[0].consultant, "Han aprobado el crédito completamente.||||"+note, datecomplete], function(err, rows){
        if (err) throw err;
      });
    
  });

}

