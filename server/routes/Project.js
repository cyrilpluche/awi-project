const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const projectController = require('../controllers').Project;
const memberHasProjectController = require('../controllers').MemberHasProject;
const memberHasActionController = require('../controllers').MemberHasAction;
const actionController = require('../controllers').Action;

// router.use(mw.Token.verifyToken)

router.get('/find_all', projectController.findAll);
router.get('/find_all_searchbar', projectController.findAllSearchbar);
router.get('/find_all_member/:member',mw.Token.verifyToken, projectController.findAllProjectMember);
router.get('/find_all_mhp',mw.Token.verifyToken, memberHasProjectController.findAll);

router.get('/find_all_lists_cards',mw.Token.verifyToken, projectController.findAllListsCards);
router.get('/find_all_members', mw.Token.verifyToken, memberHasProjectController.findAll)
router.get('/find_all_actions', mw.Token.verifyToken, actionController.findAll)
router.get('/member_has_project',mw.Token.verifyToken, projectController.findMemberHasProject);

router.get('/find_one', projectController.findOne);
router.get('/find_one/:id', projectController.findProjectInfo);

router.post('/create', projectController.create);
router.post('/create_invitation', mw.Token.verifyToken, memberHasProjectController.create, mw.Token.generateInvitationToken, mw.Email.sendNewInvitation);
router.post('/create_mhp', mw.Token.verifyToken, memberHasProjectController.create);

router.post('/test', memberHasActionController.create);

router.post('/createMemberHasProject', projectController.createMemberHasProject);

router.put('/update/:id', projectController.update);
router.put('/update_memberHasProject', projectController.updateMemberHasProject);
router.put('/update_mhp', memberHasProjectController.update);

router.delete('/delete/:id', projectController.delete);
router.delete('/delete_mhp', memberHasProjectController.delete);

module.exports = router;