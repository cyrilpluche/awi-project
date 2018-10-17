var express = require('express');
var router = express.Router();

const teamController = require('../controllers').team;

router.get('/find_all', teamController.findAll);

module.exports = router;