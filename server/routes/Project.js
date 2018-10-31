const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const projectController = require('../controllers').Project;

router.get('/find_all', mw.Token.verifyToken, projectController.findAll);
router.get('/find_one', mw.Token.verifyToken, projectController.findOne);
router.get('/find_one/:id', mw.Token.verifyToken, projectController.findProjectInfo);

router.post('/create', mw.Token.verifyToken, projectController.create);

router.put('/update/:id', mw.Token.verifyToken, projectController.update);

router.delete('/delete/:id', mw.Token.verifyToken, projectController.delete);

module.exports = router;