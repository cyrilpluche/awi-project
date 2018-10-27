var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var actionController = require('../controllers').Action;

router.use('/', mw.Token.verifyToken)

router.get('/find_all', actionController.findAll);
router.get('/find_one', actionController.findOne);

router.post('/create', actionController.create);

router.put('/update/:id', actionController.update);

router.delete('/delete/:id', actionController.delete);

module.exports = router;