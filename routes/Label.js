const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const labelController = require('../controllers').Label;

router.use(mw.Token.verifyToken)

router.get('/find_all', labelController.findAll);

router.get('/find_one', labelController.findOne);

router.post('/create', labelController.create);

router.put('/update', labelController.update);

router.delete('/delete', labelController.delete);

module.exports = router;