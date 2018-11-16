var express = require('express');
var router = express.Router();
var mw = require('../middlewares');

var memberController = require('../controllers').Member;
const memberHasProjectController = require('../controllers').MemberHasProject;
var mhppController = require('../controllers').MemberHasPermissionProject

let multer = require('multer');
let upload = multer();

router.get('/find_all', mw.Token.verifyToken, memberController.findAll);
router.get('/find_one', mw.Token.verifyToken, memberController.findOne);
router.get('/is_logged', mw.Token.verifyToken, memberController.findOneForLog, memberController.signIn);
router.get('/find_one_invitation', memberHasProjectController.findOne)
router.get('/decrypt_invitation', mw.Token.verifyToken, memberController.tokenToQuery, memberController.findOne, memberController.decodedToResult)
router.get('/sign_in_with_github', memberController.sign_in_with_github);
router.get('/github_callback', memberController.github_callback, memberController.github_get_user, memberController.find_one_github, mw.Token.generateToken, memberController.github_redirection);

router.post('/create', mw.Token.verifyToken, memberController.create);
router.post('/sign_up', memberController.findOneSignup, memberController.create, mw.Token.generateToken, mw.Email.sendEmail);
router.post('/sign_in', memberController.findOneSignIn, mw.Token.generateToken);
router.post('/password_forgotten', mw.Token.generateRandomToken, memberController.resetPassword, mw.Email.sendNewPassword);
router.post('/create_if_not_exist', mw.Token.verifyToken, memberController.findOne, memberController.createOrNext);

router.put('/update', mw.Token.verifyToken, memberController.update, memberController.findOne, mw.Token.generateToken);
router.put('/update_password', mw.Token.verifyToken, memberController.findOneUpdatePassword, memberController.isFound, memberController.update, memberController.findOne, mw.Token.generateToken);
router.put('/update_picture', mw.Token.verifyToken, memberController.storeProfilePicture, memberController.findOne, mw.Token.generateToken);
router.put('/validate_account', mw.Token.verifyToken, memberController.validateAccount, memberController.update)
router.put('/update_invitation', mw.Token.verifyToken, memberHasProjectController.update)
router.put('/update_sign_up', memberController.findOneInvitation, memberController.update, memberController.findOne)

router.delete('/delete/:id', mw.Token.verifyToken, memberController.delete);
router.delete('/delete_invitation', mw.Token.verifyToken, memberHasProjectController.delete);

module.exports = router;