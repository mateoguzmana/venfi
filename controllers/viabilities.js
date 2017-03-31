var express = require('express')
  , router = express.Router()
  , Viabilities = require('../models/viabilities')
  , jsreport = require('jsreport')
  , multer = require('multer')

router.get('/All/:id', function(req, res) {
  var id = req.params.id;
  Viabilities.getAllViabilities(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/Second', function(req, res) {
  Viabilities.getAllViabilities2(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Viabilities.getViability(id, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  
  var date             = req.body.date;
  var agreement        = req.body.agreement;
  var consultant       = req.body.consultant;
  var vehiclevalue     = req.body.vehiclevalue;
  var quotas           = req.body.quotas;
  var vehiclereference = req.body.vehiclereference;
  var vehiclemodel     = req.body.vehiclemodel;
  var invoicevalue     = req.body.invoicevalue;
  var nit              = req.body.nit;
  var name             = req.body.name;
  var birthdate        = req.body.birthdate;
  var occupation       = req.body.occupation;
  var income           = req.body.income;
  var nitcodebtor      = req.body.nitcodebtor;
  var namecodebtor     = req.body.namecodebtor;
  var incomecodebtor   = req.body.incomecodebtor;
  
  Viabilities.insertViability(date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadFile', multer({dest: "./uploads/viabilities/"}).array("uploads[]", 12), function(req, res) {
  
  var id             = req.query.id;
  
  Viabilities.uploadFile(id, req.files[0] ,function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadFile2', multer({dest: "./uploads/viabilities/"}).array("uploads[]", 12), function(req, res) {
  var id = req.query.id;

  Viabilities.uploadFile2(id, req.files[0], function (err, rows) {
    res.send(rows)
  })
})

router.post('/clone', function(req, res) {
  
  var date             = req.body.date2;
  var agreement        = req.body.agreement;
  var consultant       = req.body.consultant;
  var vehiclevalue     = req.body.vehiclevalue;
  var quotas           = req.body.quotas;
  var vehiclereference = req.body.vehiclereference;
  var vehiclemodel     = req.body.vehiclemodel;
  var invoicevalue     = req.body.invoicevalue;
  var nit              = req.body.nit;
  var name             = req.body.name;
  var birthdate        = req.body.birthdate;
  var occupation       = req.body.occupation;
  var income           = req.body.income;
  var nitcodebtor      = req.body.nitcodebtor;
  var namecodebtor     = req.body.namecodebtor;
  var incomecodebtor   = req.body.incomecodebtor;
  
  Viabilities.cloneViability(date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var idviability      = req.body.idviability;
  var date             = req.body.date;
  var agreement        = req.body.agreement;
  var consultant       = req.body.consultant;
  var vehiclevalue     = req.body.vehiclevalue;
  var quotas           = req.body.quotas;
  var vehiclereference = req.body.vehiclereference;
  var vehiclemodel     = req.body.vehiclemodel;
  var invoicevalue     = req.body.invoicevalue;
  var nit              = req.body.nit;
  var name             = req.body.name;
  var birthdate        = req.body.birthdate;
  var occupation       = req.body.occupation;
  var income           = req.body.income;
  var nitcodebtor      = req.body.nitcodebtor;
  var namecodebtor     = req.body.namecodebtor;
  var incomecodebtor   = req.body.incomecodebtor;

  Viabilities.updateViability(idviability, date, agreement, consultant, vehiclevalue, quotas, vehiclereference, vehiclemodel, invoicevalue, nit, name, birthdate, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Viabilities.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

router.get('/print/:id', function(req, res) {
  var id     = req.params.id;
  Viabilities.getViability(id, function (err, rows) {
    jsreport.render({ 
       template: { 
           content: '<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"> <title>Estudio de viabilidad</title> <style>.clearfix:after{content: ""; display: table; clear: both;}a{color: #5D6975; text-decoration: underline;}body{position: relative; width: 21cm; height: 29.7cm; margin: 0 auto; color: #001028; background: #FFFFFF; font-family: Arial, sans-serif; font-size: 18px; font-family: Arial;}.text-alert{font-size: 12px;}header{padding: 10px 0; margin-bottom: 30px;}#logo{text-align: left; margin-bottom: 10px;}#logo img{width: 250px;}h1{border-top: 1px solid #5D6975; border-bottom: 1px solid #5D6975; color: #5D6975; font-size: 2.4em; line-height: 1.4em; font-weight: normal; text-align: center; margin: 0 0 20px 0; background: url(dimension.png);}#project{float: left;}#project .f1{color: #5D6975; width: 50%; text-align: left; font-size: 0.8em;}#project .f2{text-align: right; font-size: 12px;}#company{float: right; text-align: right;}#project div,#company div{white-space: nowrap;}table{width: 100%; border-collapse: collapse; border-spacing: 0; margin-bottom: 20px;}table tr:nth-child(2n-1) td{background: #F5F5F5;}table th,table td{text-align: center;}table th{padding: 5px 20px; color: #5D6975; border-bottom: 1px solid #C1CED9; white-space: nowrap; font-weight: normal;}table .service,table .desc{text-align: left;}table td{padding: 20px; text-align: right;}table td.service,table td.desc{vertical-align: top;}table td.unit,table td.qty,table td.total{font-size: 1.2em;}table td.grand{border-top: 1px solid #5D6975;;}#notices .notice{color: #5D6975; font-size: 1.2em;}footer{color: #5D6975; width: 100%; height: 30px; position: absolute; bottom: 0; border-top: 1px solid #C1CED9; padding: 8px 0; text-align: center;text-align:justify;text-justify:inter-word;}</style> </head> <body> <header class="clearfix"> <div id="logo"> <img src="http://venfi.datosmovil.info:8000/uploads/config/logo.png"> </div><h1></h1> <div id="company" class="clearfix"> <div>Venfi S.A.S</div><div>Calle 85 # 4801,<br/> Int 31 Torre A Oficina 642, Itagüi</div><div>419-5153 | 419-5173</div><div><a href="mailto:company@example.com">venfi@venfinanciera.com.co</a></div></div><div id="project"> <div><span class="f1">FECHA</span> <span class="f2">{{:date}}</span></div><div><span class="f1">CONVENIO</span> <span class="f2">{{:agreement}}</span></div><div><span class="f1">ASESOR</span> <span class="f2">{{:consultant}}</span></div><div><span class="f1">VALOR MOTO</span> <span class="f2">{{:vehiclevalue}}</span></div><div><span class="f1">CUOTAS</span> <span class="f2">{{:quotas}}</span></div><div><span class="f1">REFERENCIA</span> <span class="f2">{{:vehiclereference}}</span></div><div><span class="f1">MODELO</span> <span class="f2">{{:vehiclemodel}}</span></div><div><span class="f1">VALOR FACT.</span> <span class="f2">{{:invoicevalue}}</span></div></div></header> <main> <table> <thead> <tr> <th class="service">Solicitante</th> <th width="50%"></th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:name}}</td></tr><tr> <td class="service">Identificación</td><td class="desc">{{:nit}}</td></tr><tr> <td class="service">Ingresos</td><td class="desc">{{:income}}</td></tr></tbody> </table> <table> <thead> <tr> <th class="service">Respaldo</th> <th width="50%"></th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:namecodebtor}}</td></tr><tr> <td class="service">Identificación</td><td class="desc">{{:nitcodebtor}}</td></tr><tr> <td class="service">Ingresos</td><td class="desc">{{:incomecodebtor}}</td></tr></tbody> </table> <table style="width:80%;margin:0 auto;"> <tbody> <tr> <td class="service" width="50%"> <hr> <br>Firma Solicitante </td><td class="desc"> <hr> <br>C.C. </td></tr><tr> <td colspan="2"></td></tr><tr> <td class="service" width="50%"> <hr> <br>Firma respaldo </td><td class="desc"> <hr> <br>C.C. </td></tr></tbody> </table> </main> <footer class="text-alert">{{:habeasdata}}</footer> </body></html>', 
           engine: 'jsrender', 
           recipe: 'phantom-pdf'
        },
        data: rows
    }).then(function(out) {
     out.stream.pipe(res)
   });
  })
})

module.exports = router