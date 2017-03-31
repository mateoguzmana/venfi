var db = require("../db.js");

exports.getAllMessages = function(idsender, res) {
  db.query('SELECT M.idmessage AS id, M.idsender, CONCAT(U.name," ",U.lastname) AS sender, U.email AS senderMail, M.emails, M.subject, M.message, M.date, M.state AS folderId FROM tblvf_messages AS M INNER JOIN tblvf_users AS U ON M.idsender=U.iduser WHERE idsender=? ORDER BY M.date DESC', idsender, function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.getMessage = function(id, res) {
  db.query('SELECT idmessage, idsender, emails, subject, message, date FROM tblvf_messages WHERE idmessage= ?', id, function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.getUsersEmail = function(id, res) {
  db.query('SELECT CONCAT(name," ",lastname) AS namereceiver FROM tblvf_users WHERE iduser IN ('+id+')', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

exports.insertMessage = function(idsender, emails, subject, message, date, res) {
  
  emails  = emails.toString();
  var count = 0;
  var emailsString = [];

  db.query('INSERT INTO tblvf_messages (idsender, emails, subject, message, date, state) VALUES (?, ?, ?, ?, ?, 2) ', [idsender, emails, subject, message, date], function(err, rows){
    if (err) throw err;

    // Function for get emails from id users

    getReceiverEmails(emails, function(err, resp){
      
      for(var x = 0; x < resp.length; x++){

        emailsString.push(resp[x].email);

        count++;

        // When array each totally, execute this

        if(count==resp.length){

          sendMailTotally(idsender, emailsString, subject, message);
          res(null, {state: 1})
        
        }

      }


    })
    
  });
}

exports.draftMessage = function(idsender, emails, subject, message, date, res) {
  emails  = emails.toString();

  db.query('INSERT INTO tblvf_messages (idsender, emails, subject, message, date, state) VALUES (?, ?, ?, ?, ?, 1) ', [idsender, emails, subject, message, date], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.updateMessage = function(idmessage, emails, subject, message, res) {
  db.query('UPDATE tblvf_messages SET emails=?, subject=?, message=? WHERE idmessage= ? ', [emails, subject, message, idmessage], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.deleteMessages = function(id, res) {
  id  = id.toString();
  
  db.query('UPDATE tblvf_messages SET state=0 WHERE idmessage IN ('+id+') ', function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.changeState = function(id, state, res) {
  db.query('UPDATE tblvf_messages SET state= ? WHERE idmessage= ? ', [state, id], function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

getReceiverEmails = function(emails, res) {
  db.query('SELECT email FROM tblvf_users WHERE iduser IN ('+emails+')', function(err, rows){
    if (err) throw err;
    res(null, rows)
  });
}

sendMailTotally = function(idsender, emails, subject, message, res){

var nodemailer = require('nodemailer');
emails  = emails.toString();

    // Define transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'desarrolloactivity14@gmail.com',
            pass: '2016activity900'
        }
    });

    // Define mail
    var mailOptions = {
      from: 'Venfi <venfidevelopment@gmail.com>',
      to: emails,
      subject: subject,
      text: message
    };
    
    // Send email
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);
      } else {
          console.log("Email sent");
      }
    });

}


