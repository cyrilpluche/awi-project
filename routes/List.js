var express = require('express');
var router = express.Router();
var mw = require('../middlewares')

var listController = require('../controllers').List;

router.use(mw.Token.verifyToken)

router.get('/find_all', listController.findAll);
router.get('/find_one/:id', listController.findOne);
router.get('/find_all_searchbar', listController.findAllSearchbar);
router.get('/find_all/:id', listController.findAllOfProject);

router.post('/create', listController.create);

router.put('/update/:id', listController.update);
router.put('/update_list_order', listController.updateFromArray);

router.delete('/delete/:id', listController.delete);

module.exports = router;