const express = require('express');
const router = express.Router();
const mw = require('../middlewares')

const permissionController = require('../controllers').Permission;

router.use(mw.Token.verifyToken)

router.get('/find_all', permissionController.findAll);
router.get('/find_one', permissionController.findOne);

router.post('/create', permissionController.create);

router.put('/update', permissionController.update);

router.delete('/delete', permissionController.delete);

module.exports = router;