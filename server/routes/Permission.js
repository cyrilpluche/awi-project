const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const permissionController = require('../controllers').Permission;
const mhppController = require('../controllers').MemberHasPermissionProject;
const mhp = require('../controllers').MemberHasProject;

router.use(mw.Token.verifyToken)

router.get('/find_all', permissionController.findAll);
router.get('/find_all_for_project', mhp.findAll);
router.get('/find_one', permissionController.findOne);

router.post('/create', permissionController.create);
router.post('/create_for_project', mhppController.create);

router.put('/update', permissionController.update);
router.put('/update_for_project', mhppController.update);

router.delete('/delete', permissionController.delete);
router.delete('/delete_for_project', mhppController.delete);

module.exports = router;