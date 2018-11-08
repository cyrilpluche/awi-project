const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const cardController = require('../controllers').Card;
const mhcController = require('../controllers').Card;

const chlController = require('../controllers').Card;


router.use(mw.Token.verifyToken)

router.get('/find_all', cardController.findAll);
router.get('/find_all/:id', cardController.findAllOfList);
router.get('/find_all_searchbar', cardController.findAllSearchbar);

router.get('/find_one', cardController.findOne);

router.post('/create', cardController.create);
router.post('/create_member_has_card', mhcController.create);

router.put('/update/:id', cardController.update);
router.put('/update_card_has_label', chlController.update);

router.delete('/delete', cardController.delete);
router.delete('/delete_member_has_card', mhcController.delete);

module.exports = router;