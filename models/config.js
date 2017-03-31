var db = require("../db.js");

exports.getConfig = function(res) {
  db.query('SELECT habeasdata, sessiontime FROM tblvf_config', function(err, rows){
    if (err) throw err;
    res(null, rows[0])
  });
}

exports.updateConfig = function(habeasdata, sessiontime, res) {
  db.query('UPDATE tblvf_config SET habeasdata=?, sessiontime=?', [habeasdata, sessiontime],  function(err, rows){
    if (err) throw err;
    res(null, {state: 1})
  });
}

exports.uploadFile = function(file, res) {
    
   var fs = require('fs')
   var path = require('path')
  
   var xpath = file.path
   var ext  = path.extname(file.originalname)
   var name = "logo.png"
   var newPath = 'uploads/config/'+name
   var is = fs.createReadStream(xpath)
   var os = fs.createWriteStream(newPath)

   is.pipe(os)

   is.on('end', function() {
    fs.unlinkSync(xpath)
   })
   res(null, {state: 1})
}


