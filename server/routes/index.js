const express = require('express');
const router = express.Router();

/* routes */
router.use('/team', require("./Team"));

module.exports = router;
