const express = require('express');
const router = express.Router();

/* routes */
router.use('/team', require("./Team"));
router.use('/member', require("./Member"));

router.use('/project', require("./Project"));
router.use('/list', require("./List"));
router.use('/label', require("./Label"));
router.use('/card', require("./Card"));

router.use('/task', require("./Task"));

router.use('/action', require("./Action"));
router.use('/permission', require("./Permission"));

module.exports = router;
