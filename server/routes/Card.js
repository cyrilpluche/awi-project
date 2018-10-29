var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var cardController = require('../controllers').Card;

router.get('/find_all', mw.Token.verifyToken, cardController.findAll);
router.get('/find_one', mw.Token.verifyToken, cardController.findOne);

router.post('/create', mw.Token.verifyToken, cardController.create);

router.put('/update/:id', mw.Token.verifyToken, cardController.update);

router.delete('/delete/:id', mw.Token.verifyToken, cardController.delete);

module.exports = router;