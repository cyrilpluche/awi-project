var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var teamController = require('../controllers').Team;

router.get('/find_all', mw.Token.verifyToken, teamController.findAll);
router.get('/find_one/:id', mw.Token.verifyToken, teamController.findOne);

router.post('/create', mw.Token.verifyToken, teamController.create);

router.put('/update/:id', mw.Token.verifyToken, teamController.update);

router.delete('/delete/:id', mw.Token.verifyToken, teamController.delete);

module.exports = router;