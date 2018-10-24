var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var projectController = require('../controllers').Project;

router.get('/find_all', mw.Token.verifyToken, projectController.findAll);
router.get('/find_one', mw.Token.verifyToken, projectController.findOne);

router.post('/create', mw.Token.verifyToken, projectController.create);

router.put('/update/:id', mw.Token.verifyToken, projectController.update);

router.delete('/delete/:id', mw.Token.verifyToken, projectController.delete);

module.exports = router;