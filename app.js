var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 4000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Origin, X-Requested-With, Content-Type, Accept, Methods")
  next()
});

app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

app.listen(port, function() {
  console.log('Listening on port ' + port)
})