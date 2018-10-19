const express = require('express');
const router = express.Router();

/* routes */
router.use('/team', require("./Team"));
router.use('/member', require("./Member"));

module.exports = router;
