var express  = require('express')
  , router   = express.Router()
  , Credits  = require('../models/credits')
  , jsreport = require('jsreport')
  , multer   = require('multer')

router.get('/', function(req, res) {
  Credits.getAllCredits(function (err, rows) {
    res.send(rows)
  })
})

router.get('/ForInspect', function(req, res) {
  Credits.getAllCreditsForInspect(function (err, rows) {
    res.send(rows)
  })
})

router.get('/Active', function(req, res) {
  Credits.getActiveCredits(function (err, rows) {
    res.send(rows)
  })
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Credits.getCredit(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/print/:id', function(req, res) {
  var id     = req.params.id;
  Credits.getCredit(id, function (err, rows) {
    jsreport.render({ 
       template: { 
           content: '<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"> <title>Estudio de viabilidad</title> <style>.clearfix:after{content: ""; display: table; clear: both;}a{color: #5D6975; text-decoration: underline;}body{position: relative; width: 21cm; height: 29.7cm; margin: 0 auto; color: #001028; background: #FFFFFF; font-family: Arial, sans-serif; font-size: 15px; font-family: Arial;}.text-alert{font-size: 12px;}header{padding: 10px 0; margin-bottom: 30px;}#logo{text-align: left; margin-bottom: 10px;}#logo img{width: 250px;}h1{border-top: 1px solid #5D6975; border-bottom: 1px solid #5D6975; color: #5D6975; font-size: 2.4em; line-height: 1.4em; font-weight: normal; text-align: center; margin: 0 0 20px 0; background: url(dimension.png);}#project{float: left;}#project .f1{color: #5D6975; width: 50%; text-align: left; font-size: 0.8em;}#project .f2{text-align: right; font-size: 12px;}#company{float: right; text-align: right;}#project div,#company div{white-space: nowrap;}table{width: 100%; border-collapse: collapse; border-spacing: 0; margin-bottom: 20px;}table tr:nth-child(2n-1) td{background: #F5F5F5;}table th,table td{text-align: center;}table th{padding: 5px 20px; color: #5D6975; border-bottom: 1px solid #C1CED9; white-space: nowrap; font-weight: normal;}table .service,table .desc{text-align: left;}table td{padding: 5px; text-align: right;}table td.service,table td.desc{vertical-align: top;}table td.unit,table td.qty,table td.total{font-size: 1.2em;}table td.grand{border-top: 1px solid #5D6975;;}#notices .notice{color: #5D6975; font-size: 1.2em;}footer{color: #5D6975; width: 100%; height: 30px; position: absolute; bottom: -200; border-top: 1px solid #C1CED9; padding: 8px 0; text-align: center;text-align:justify;text-justify:inter-word;}</style> </head> <body> <header class="clearfix"> <div id="logo"> <img src="http://venfi.datosmovil.info:8000/uploads/config/logo.png"> </div><h1></h1> <div id="company" class="clearfix"> <div>Venfi S.A.S</div><div>Calle 85 # 4801,<br/> Int 31 Torre A Oficina 642, Itagüi</div><div>419-5153 | 419-5173</div><div><a href="mailto:company@example.com">venfi@venfinanciera.com.co</a></div></div><div id="project"> <div><span class="f1">FECHA</span> <span class="f2">{{:date}}</span></div><div><span class="f1">CONVENIO</span> <span class="f2">{{:nameagreement}}</span></div><div><span class="f1">ASESOR</span> <span class="f2">{{:nameconsultant}}</span></div><div><span class="f1">VALOR MOTO</span> <span class="f2">{{:value}}</span></div><div><span class="f1">CUOTAS</span> <span class="f2">{{:quotas}}</span></div></div></header> <main> <table> <thead> <tr> <th class="service" width="25%">Solicitante</th> <th width="25%"></th> <th width="25%"></th> <th width="25%"></th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:debtor["name"]}}</td><td class="service">Identificación</td><td class="desc">{{:debtor["nit"]}}</td></tr><tr> <td class="service">Dirección</td><td class="desc">{{:debtor["address"]}}</td><td class="service">Celular</td><td class="desc">{{:debtor["cell"]}}</td></tr><tr> <td class="service">Telefono</td><td class="desc">{{:debtor["phone1"]}}</td><td class="service">Correo electronico</td><td class="desc">{{:debtor["email"]}}</td></tr><tr> <td class="service">Empresa</td><td class="desc">{{:debtor["company"]}}</td><td class="service">Telefono</td><td class="desc">{{:debtor["phone2"]}}</td></tr><tr> <td class="service">Ingresos mensuales</td><td class="desc">{{:debtor["monthlyincome"]}}</td><td class="service">Egresos mensuales</td><td class="desc">{{:debtor["monthlyexpenses"]}}</td></tr><tr> <td class="service">Otros ingresos</td><td class="desc">{{:debtor["otherincome"]}}</td><td class="service">Activos</td><td class="desc">{{:debtor["actives"]}}</td></tr><tr> <td class="service">Pasivos</td><td class="desc">{{:debtor["liabilities"]}}</td><td class="service">Patrimonio</td><td class="desc">{{:debtor["patrimony"]}}</td></tr><tr> <td class="service">Concepto de otros ingresos</td><td class="desc" colspan="3">{{:debtor["otherincomeconcept"]}}</td></tr></tbody> </table> <table> <thead> <tr> <th width="25%" colspan="4" class="service">Referencias comerciales, familiares o personales</th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:debtor["namereference"]}}</td><td class="service">Telefono</td><td class="desc">{{:debtor["phonereference"]}}</td></tr><tr> <td class="service">Observaciones</td><td class="desc" colspan="3">{{:debtor["observations"]}}</td></tr></tbody> </table> <table> <thead> <tr> <th class="service" width="25%">Respaldo</th> <th width="25%"></th> <th width="25%"></th> <th width="25%"></th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:codebtors[0]["namecodebtor"]}}</td><td class="service">Identificación</td><td class="desc">{{:codebtors[0]["nitcodebtor"]}}</td></tr><tr> <td class="service">Dirección</td><td class="desc">{{:codebtors[0]["addresscodebtor"]}}</td><td class="service">Celular</td><td class="desc">{{:codebtors[0]["cellcodebtor"]}}</td></tr><tr> <td class="service">Telefono</td><td class="desc">{{:codebtors[0]["phone1codebtor"]}}</td><td class="service">Correo electronico</td><td class="desc">{{:codebtors[0]["emailcodebtor"]}}</td></tr><tr> <td class="service">Empresa</td><td class="desc">{{:codebtors[0]["companycodebtor"]}}</td><td class="service">Telefono</td><td class="desc">{{:codebtors[0]["phone2codebtor"]}}</td></tr><tr> <td class="service">Ingresos mensuales</td><td class="desc">{{:codebtors[0]["monthlyincomecodebtor"]}}</td><td class="service">Egresos mensuales</td><td class="desc">{{:codebtors[0]["monthlyexpensescodebtor"]}}</td></tr><tr> <td class="service">Otros ingresos</td><td class="desc">{{:codebtors[0]["otherincomecodebtor"]}}</td><td class="service">Activos</td><td class="desc">{{:codebtors[0]["activescodebtor"]}}</td></tr><tr> <td class="service">Pasivos</td><td class="desc">{{:codebtors[0]["liabilitiescodebtor"]}}</td><td class="service">Patrimonio</td><td class="desc">{{:codebtors[0]["patrimonycodebtor"]}}</td></tr><tr> <td class="service">Concepto de otros ingresos</td><td class="desc" colspan="3">{{:codebtors[0]["otherincomeconceptcodebtor"]}}</td></tr></tbody> </table> <table> <thead> <tr> <th width="25%" colspan="4" class="service">Referencias comerciales, familiares o personales</th> </tr></thead> <tbody> <tr> <td class="service">Nombre</td><td class="desc">{{:codebtors[0]["namereferencecodebtor"]}}</td><td class="service">Telefono</td><td class="desc">{{:codebtors[0]["phonereferencecodebtor"]}}</td></tr><tr> <td class="service">Observaciones</td><td class="desc" colspan="3">{{:codebtors[0]["observationscodebtor"]}}</td></tr></tbody> </table> <br><table style="width:100%;margin:0 auto;"> <tbody> <tr> <td class="service" width="25%"> <hr>Firma Solicitante </td><td class="desc" width="25%"> <hr>C.C. </td><td class="service" width="25%"> <hr>Firma respaldo </td><td class="desc" width="25%"> <hr>C.C. </td></tr></tbody> </table> </main> <footer class="text-alert">“ Señores VENFI SAS: los autoriza para que utilicen los datos consignados y los que suministre con ocasión del crédito para que se me suministre o contacte de forma periódica y mientras la actividad comercial se encuentre en operación, todo tipo de información comercial relacionada con los productos y servicios contratados o que comercialice, para enviar ofertas, para realizar cobros, promociones, demás datos o actividades relacionadas, así como consultar y reportar a cualquier base de datos sobre nuestro comportamiento crediticio y comercial. Esta información, en caso de que VENFI SAS, así lo considere, será transferida a terceras personas, nacionales o extranjeras (naturales o jurídicas) en calidad de encargados del tratamiento, con las cuales contrate actividades de cualquier tipo, quienes darán a la base de datos el uso informado en la presente. Se le informa que usted como titular tiene los derechos consagrados en el artículo 8 de la ley 158 de 2012: A-) Conocer, actualizar y rectificar sus datos. B-) Solicitar prueba de su autorización. C-) Ser informado sobre el uso que se le ha dado a sus datos. D-) Presentar quejas ante la SIC por infracciones. E-) Renovar su autorización de acuerdo con el procedimiento creado por la SIC INT 31 NIT 900799969-5 F-) Acceder gratuitamente a sus datos personales. El responsable del tratamiento es VENFI SAS, CALLE 85 NUMERO 4801 INT 31 TORRE A OFICINA 642.”</footer> </body></html>', 
           engine: 'jsrender', 
           recipe: 'phantom-pdf'
        },
        data: rows
    }).then(function(out) {
     out.stream.pipe(res)
   });
  })
})

router.get('/validateCredit/:id', function(req, res) {
  var id = req.params.id;
  Credits.validateCredit(id, function (err, rows) {
    res.send(rows)
  })
})

router.get('/getDocumentsForResponse/:id/:workflow', function(req, res) {
  var id       = req.params.id;
  var workflow = req.params.workflow;

  Credits.getDocumentsForResponse(id, workflow, function (err, rows) {
    res.send(rows)
  })
})

router.post('/', function(req, res) {
  var nitdebtor   = req.body.nitdebtor;
  Credits.insertCredit(nitdebtor, function (err, rows) {
    res.send(rows)
  })
})

router.post('/SendCredit', function(req, res) {
  var idcredit        = req.body.idcredit;

  Credits.SendCredit(idcredit,
   function (err, rows) {
    res.send(rows)
  })
})

router.post('/StepTwo', function(req, res) {
  var idcredit        = req.body.idcredit;
  var quotas          = req.body.quotas;
  var debtor          = req.body.debtor;
  var codebtors       = req.body.codebtors;

  Credits.StepTwo(idcredit, quotas, debtor, codebtors,
   function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadDocument', multer({dest: "./uploads/credits/documents/"}).array("uploads[]", 12), function(req, res) {
  
  var credit         = req.query.credit;
  var id             = req.query.id;
  var type           = req.query.type;
  
  Credits.uploadDocument(credit, id, type, req.files[0] ,function (err, rows) {
    res.send(rows)
  })
})

router.post('/uploadDocumentForResponse', multer({dest: "./uploads/credits/responsedocuments/"}).array("uploads[]", 12), function(req, res) {
  
  var credit         = req.query.credit;
  var type           = req.query.type;
  var workflow       = req.query.workflow;
  
  Credits.uploadDocumentForResponse(credit, type, workflow, req.files[0] ,function (err, rows) {
    res.send(rows)
  })
})

router.post('/approveCredit', function(req, res) {
  var idcredit   = req.body.idcredit;
  var note       = req.body.note;
  var workflow   = req.body.workflow;

  Credits.approveCredit(idcredit, note, workflow, function (err, rows) {
    res.send(rows)
  })
})

router.post('/rejectCredit', function(req, res) {
  var idcredit   = req.body.idcredit;
  var note       = req.body.note;
  Credits.rejectCredit(idcredit, note, function (err, rows) {
    res.send(rows)
  })
})

router.put('/', function(req, res) {
  var idcredit = req.body.idcredit;
  var nitdebtor   = req.body.nitdebtor;
  Credits.updateCredit(idcredit, nitdebtor, function (err, rows) {
    res.send(rows)
  })
})


router.put('/approve', function(req, res) {
  var id             = req.body.id;
  var nit            = req.body.nit;
  var name           = req.body.name;
  var occupation     = req.body.occupation;
  var income         = req.body.income;
  var nitcodebtor    = req.body.nitcodebtor;
  var namecodebtor   = req.body.namecodebtor;
  var incomecodebtor = req.body.incomecodebtor;
  var note           = req.body.note;
  var finalvalue     = req.body.finalvalue;
  var safevalue      = req.body.safevalue;
  Credits.approveViability(id, nit, name, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, note, finalvalue, safevalue, function (err, rows) {
    res.send(rows)
  })
})

router.put('/reject', function(req, res) {
  var id      = req.body.id;
  var nit     = req.body.nit;
  var note     = req.body.note;
  Credits.rejectViability(id, nit, note, function (err, rows) {
    res.send(rows)
  })
})

router.put('/changeState', function(req, res) {
  var id     = req.body.id;
  var state  = req.body.state;
  Credits.changeState(id, state, function (err, rows) {
    res.send(rows)
  })
})

router.put('/DeleteDocument', function(req, res) {
  var id     = req.body.id;
  Credits.DeleteDocument(id, function (err, rows) {
    res.send(rows)
  })
})

router.put('/DeleteDocumentForResponse', function(req, res) {
  var id     = req.body.id;
  Credits.DeleteDocumentForResponse(id, function (err, rows) {
    res.send(rows)
  })
})

module.exports = router