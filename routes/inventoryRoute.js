// Needed Resources
const express = require("express")
const router = new express.Routers()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
module.exports = router;