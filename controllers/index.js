var express = require('express');
var router = express.Router();

router.use("/api/bucket-list", require("./bucket_list"));

module.exports = router;