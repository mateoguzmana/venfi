var express = require('express')
  , router = express.Router()

router.use('/login',         require('./login'))
router.use('/menu',          require('./menu'))
router.use('/config',        require('./config'))
router.use('/privileges',    require('./privileges'))
router.use('/check',         require('./check'))
router.use('/roles',         require('./roles'))
router.use('/typedocuments', require('./typedocuments'))
router.use('/workflow',      require('./workflow'))
router.use('/users',         require('./users'))
router.use('/dealers',       require('./dealers'))
router.use('/viabilities',   require('./viabilities'))
router.use('/credits',       require('./credits'))
router.use('/notifications', require('./notifications'))
router.use('/messages',      require('./messages'))


// This is only in local and mode development, commet this line
router.use('/cleandatabase_mateo', require('./cleandatabase_mateo'))


router.get('/', function(req, res) {
  res.send('Hola.')
})

module.exports = router