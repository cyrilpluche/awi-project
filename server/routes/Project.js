const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const projectController = require('../controllers').Project;

router.use(mw.Token.verifyToken)

router.get('/find_all', projectController.findAll);
router.get('/find_all_searchbar', projectController.findAllSearchbar);
router.get('/find_one', projectController.findOne);

router.post('/create', projectController.create);

router.put('/update/:id', projectController.update);

router.delete('/delete/:id', projectController.delete);

module.exports = router;