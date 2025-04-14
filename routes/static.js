// Needed Resources
const express = require('express');
const router = express.Router();

// Set up "public" folder for static files
router.use(express.static("public"));

module.exports = router;


