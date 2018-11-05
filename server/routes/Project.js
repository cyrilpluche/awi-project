const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const projectController = require('../controllers').Project;
const memberHasProjectController = require('../controllers').MemberHasProject;

// router.use(mw.Token.verifyToken)

router.get('/find_all', projectController.findAll);
router.get('/find_all_searchbar', projectController.findAllSearchbar);
router.get('/find_all_member/:member',mw.Token.verifyToken, projectController.findAllProjectMember);
router.get('/find_all_lists_cards',mw.Token.verifyToken, projectController.findAllListsCards);


router.get('/find_one', projectController.findOne);
router.get('/find_one/:id', projectController.findProjectInfo);

router.post('/create', projectController.create);
router.post('/create_invitation', mw.Token.verifyToken, memberHasProjectController.create, mw.Token.generateInvitationToken, mw.Email.sendNewInvitation);
//router.get('/test', memberHasProjectController.findAll);

router.post('/createMemberHasProject', projectController.createMemberHasProject);

router.put('/update/:id', projectController.update);
router.put('/update_memberHasProject', projectController.updateMemberHasProject);

router.delete('/delete/:id', projectController.delete);

module.exports = router;