const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const projectController = require('../controllers').Project;

router.use(mw.Token.verifyToken)

router.get('/find_all', projectController.findAll);
router.get('/find_all_searchbar', projectController.findAllSearchbar);


router.get('/find_all_member/:member',mw.Token.verifyToken, projectController.findAllProjectMember);

router.get('/member_has_project',mw.Token.verifyToken, projectController.findMemberHasProject);

router.get('/find_one', projectController.findOne);
router.get('/find_one/:id', projectController.findProjectInfo);

router.post('/create', projectController.create);

router.put('/update/:id', projectController.update);

router.put('/update_memberHasProject', projectController.updateMemberHasProject);

router.delete('/delete/:id', projectController.delete);

module.exports = router;