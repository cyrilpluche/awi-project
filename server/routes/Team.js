var express = require('express');
var router = express.Router();

var teamController = require('../controllers').Team;

router.get('/find_all', teamController.findAll);
router.get('/find_one/:id', teamController.findOne);

router.post('/create', teamController.create);

router.put('/update/:id', teamController.update);

router.delete('/delete/:id', teamController.delete);

module.exports = router;