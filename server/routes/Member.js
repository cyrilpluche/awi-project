var express = require('express');
var router = express.Router();
var mw = require('../middlewares');

var memberController = require('../controllers').Member;

router.get('/find_all', mw.Token.verifyToken, memberController.findAll);
router.get('/find_one/:id', mw.Token.verifyToken, memberController.findOne);
router.get('/is_logged', mw.Token.verifyToken, memberController.signIn);

router.post('/create', mw.Token.verifyToken, memberController.create);
router.post('/sign_up', memberController.create, mw.Token.generateToken, mw.Email.sendEmail);
router.post('/sign_in', memberController.findOneSignIn, mw.Token.generateToken);

router.put('/update', mw.Token.verifyToken, memberController.update, memberController.findOne);

router.delete('/delete/:id', mw.Token.verifyToken, memberController.delete);

module.exports = router;