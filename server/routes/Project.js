var express = require('express');
var router = express.Router();

var projectController = require('../controllers').Project;

router.get('/find_all', projectController.findAll);
router.get('/find_one/:id', projectController.findOne);

router.post('/create', projectController.create);

router.put('/update/:id', projectController.update);

router.delete('/delete/:id', projectController.delete);

module.exports = router;