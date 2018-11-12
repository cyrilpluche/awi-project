const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const taskController = require('../controllers').Task;

router.use(mw.Token.verifyToken)

router.get('/find_all', taskController.findAll);
router.get('/find_one', taskController.findOne);

router.post('/create', taskController.create);

router.put('/update', taskController.update);

router.delete('/delete', taskController.delete);

module.exports = router;