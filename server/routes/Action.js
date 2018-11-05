var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var actionController = require('../controllers').Action;
var memberHasActionController = require('../controllers').MemberHasAction;
var memberHasProject = require('../controllers').MemberHasProject;

router.use('/', mw.Token.verifyToken)

router.get('/find_all', actionController.findAll);
router.get('/find_all_unarchived', actionController.findAllUnarchived, actionController.countUnreadAction);
router.get('/find_one', actionController.findOne);

router.post('/create', actionController.create);
router.post('/create_mha_from_array', actionController.create, memberHasProject.findAll, memberHasActionController.createFromArray);

router.put('/update/:id', actionController.update);
router.put('/update_multiple', actionController.updateMultiple);

router.delete('/delete/:id', actionController.delete);

module.exports = router;