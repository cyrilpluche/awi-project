const express = require('express');
const router = express.Router();

/* routes */
router.use('/team', require("./Team"));
router.use('/member', require("./Member"));
router.use('/project', require("./Project"));

module.exports = router;
