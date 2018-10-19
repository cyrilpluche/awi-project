var express = require('express');
var router = express.Router();

var memberController = require('../controllers').Member;

router.get('/find_all', memberController.findAll);
router.get('/find_one/:id', memberController.findOne);

router.post('/create', memberController.create);

router.put('/update/:id', memberController.update);

router.delete('/delete/:id', memberController.delete);

module.exports = router;