const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const cardController = require('../controllers').Card;
router.use(mw.Token.verifyToken)

router.get('/find_all', cardController.findAll);
router.get('/find_all/:id', cardController.findAllOfList);
router.get('/find_all_searchbar', cardController.findAllSearchbar);

router.get('/find_one', cardController.findOne);

router.post('/create', cardController.create);

router.put('/update/:id', cardController.update);

router.delete('/delete', cardController.delete);

module.exports = router;