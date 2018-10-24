var express = require('express');
var router = express.Router();
var mw = require('../middlewares');

var memberController = require('../controllers').Member;
var end = require('../controllers').End;

router.get('/find_all', mw.Token.verifyToken, memberController.findAll);
router.get('/find_one/:id', mw.Token.verifyToken, memberController.findOne);

router.post('/create', mw.Token.verifyToken, memberController.create);
router.post('/sign_up', memberController.create, mw.Token.generateToken, mw.Email.sendEmail, memberController.sign);
router.post('/sign_in', memberController.findOneSignIn, mw.Token.generateToken, memberController.sign);

router.put('/update/:id', mw.Token.verifyToken, memberController.update);

router.delete('/delete/:id', mw.Token.verifyToken, memberController.delete);

module.exports = router;