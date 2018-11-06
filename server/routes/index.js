const express = require('express');
const router = express.Router();

/* routes */
router.use('/team', require("./Team"));
router.use('/member', require("./Member"));

router.use('/project', require("./Project"));
router.use('/list', require("./List"));
router.use('/card', require("./Card"));

router.use('/task', require("./Task"));

router.use('/action', require("./Action"));

module.exports = router;
