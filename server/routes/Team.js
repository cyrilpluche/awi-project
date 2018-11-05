const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const teamController = require('../controllers').Team;

router.get('/find_all', mw.Token.verifyToken, teamController.findAll);

router.get('/find_all/:member', mw.Token.verifyToken, teamController.findAllTeamMember);

router.get('/find_one/:id', mw.Token.verifyToken, teamController.findOne);

router.post('/create', mw.Token.verifyToken, teamController.create);

router.put('/update/:id', mw.Token.verifyToken, teamController.update);

router.delete('/delete/:id', mw.Token.verifyToken, teamController.delete);

module.exports = router;