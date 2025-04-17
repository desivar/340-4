const express = require("express");
const router = express.Router();
const catalogController = require("../controllers/catalogController"); // You'll need to create this controller

// Route to display the vehicle catalog
router.get("/vehicles", catalogController.buildCatalog); // Example path: /vehicles

module.exports = router;