const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const teamController = require('../controllers').Team;
const thmController = require('../controllers').TeamHasMember;

router.use(mw.Token.verifyToken)

router.get('/find_all', teamController.findAll);
router.get('/find_all/:member', teamController.findAllTeamMember);

router.get('/find_one/:id', teamController.findOne);

router.post('/create', teamController.create);
router.post('/create_thm', thmController.create);

router.put('/update/:id', teamController.update);

router.delete('/delete/:id', teamController.delete);

module.exports = router;