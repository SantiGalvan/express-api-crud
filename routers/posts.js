const express = require("express");
const router = express.Router();
const { store, index } = require("../controllers/posts.js");

router.post('/', store);
router.get('/', index);

module.exports = router;