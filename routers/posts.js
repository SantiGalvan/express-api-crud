const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.js");

router.post('/', postsController.store);
router.get('/', postsController.index);
router.get('/:slug', postsController.show);

module.exports = router;