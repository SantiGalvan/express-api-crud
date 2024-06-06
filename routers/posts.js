const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts.js");

router.post('/', postsControllers.store);

module.exports = router;