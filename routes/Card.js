const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const cardController = require('../controllers').Card;
const mhpController = require('../controllers').MemberHasProject;
const mhcController = require('../controllers').MemberHasCard;

const chlController = require('../controllers').CardHasLabel;


router.use(mw.Token.verifyToken)

router.get('/find_all', cardController.findAll);
router.get('/find_all/:id', cardController.findAllOfList);
router.get('/find_all_searchbar', cardController.findAllSearchbar);
router.get('/find_all_members', mhpController.findAllForCard, mhcController.findAllMembers);

router.get('/find_one', cardController.findOne);

router.post('/create', cardController.create);
router.post('/create_member_has_card', mhcController.create);
router.post('/create_card_has_label', chlController.create);

router.put('/update/:id', cardController.update);

router.delete('/delete', cardController.delete);
router.delete('/delete_member_has_card', mhcController.delete);
router.delete('/delete_card_has_label', chlController.delete);

module.exports = router;