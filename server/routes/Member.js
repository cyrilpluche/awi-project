var express = require('express');
var router = express.Router();
var mw = require('../middlewares');

var memberController = require('../controllers').Member;

router.get('/find_all', memberController.findAll);
router.get('/find_one/:id', memberController.findOne);

router.post('/create', mw.Token.generateToken, memberController.create);

router.put('/update/:id', memberController.update);

router.delete('/delete/:id', memberController.delete);

module.exports = router;