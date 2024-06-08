// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail
router.get("/detail/:itemId", invController.buildByItemId);

router.get("/error/", invController.InternalErr)

module.exports = router;