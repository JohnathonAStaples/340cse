// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));

// Route to build 500 error
router.get("/error/", invController.InternalErr)

// Route to build management page
router.get("/", utilities.handleErrors(invController.buildMangement))

// Route to build add Classification
router.get("/addClassification", utilities.handleErrors(invController.buildNewClass))

// Route to build add Item
router.get("/addNewItem", utilities.handleErrors(invController.buildNewItem))

router.post("addClassification",
    invValidate.classificationRules(),
    invValidate.checkClassData, utilities.handleErrors(invController.addClassification))

router.post("/addNewItem", 
    invValidate.itemRules(),
    invValidate.checkItemData,

    utilities.handleErrors(invController.addItem))

module.exports = router;