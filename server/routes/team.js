var express = require('express');
var router = express.Router();

var teamController = require('../controllers').team;

router.get('/find_all', teamController.findAll);

router.post('/create', teamController.create);

module.exports = router;