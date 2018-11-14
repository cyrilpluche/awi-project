const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const actionController = require('../controllers').Action;
const memberHasActionController = require('../controllers').MemberHasAction;
const memberHasProject = require('../controllers').MemberHasProject;

router.use(mw.Token.verifyToken)

router.get('/find_all', actionController.findAll);
router.get('/find_all_unarchived', actionController.findAllUnarchived, actionController.countUnreadAction);
router.get('/find_one', actionController.findOne);

router.get('/find_all_comments/:card', actionController.findAllComments);
router.post('/create', actionController.create);
router.post('/create_mha_from_array', actionController.create, memberHasProject.findAll, memberHasActionController.createFromArray);
router.post('/create_member_has_action', memberHasActionController.create);

router.put('/update/:id', actionController.update);
router.put('/update_multiple', actionController.updateMultiple);

router.delete('/delete/:id', actionController.delete);

module.exports = router;