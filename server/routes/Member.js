var express = require('express');
var router = express.Router();
var mw = require('../middlewares');

var memberController = require('../controllers').Member;

router.get('/find_all', mw.Token.verifyToken, memberController.findAll);
router.get('/find_one/:id', mw.Token.verifyToken, memberController.findOne);

router.post('/create', mw.Token.generateToken, memberController.create);
router.post('/sign_in', memberController.findOne, mw.Token.verifyToken, memberController.signIn);

router.put('/update/:id', mw.Token.verifyToken, memberController.update);

router.delete('/delete/:id', mw.Token.verifyToken, memberController.delete);

module.exports = router;