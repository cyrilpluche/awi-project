var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var listController = require('../controllers').List;
var end = require('../controllers').End;

router.get('/find_all', mw.Token.verifyToken, listController.findAll);
router.get('/find_one/:id', mw.Token.verifyToken, listController.findOne);

router.post('/create', mw.Token.verifyToken, listController.create);

router.put('/update/:id', mw.Token.verifyToken, listController.update);

router.delete('/delete/:id', mw.Token.verifyToken, listController.delete);

module.exports = router;