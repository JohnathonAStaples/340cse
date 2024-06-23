const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}
debugger

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  let ClassName
  try {
    className = data[0].classification_name
  } catch {
    className = "No"
  }
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail
 * ************************** */
invCont.buildByItemId = async function (req, res, next) {
  const item_id = req.params.itemId
  const data = await invModel.getItemById(item_id)
  const grid = await utilities.buildItemGrid(data)
  let nav = await utilities.getNav()
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model
  const itemYear = data[0].inv_year
  res.render("./inventory/itemDetail", {
    title: `${itemName} ${itemModel} ${itemYear}`,//${itemYear}
    nav,
    grid,
  })
}

/* ***************************
 *  500 Error
 * ************************** */
invCont.InternalErr = async function (req, res, next){
  let nav = await utilities.getNav()
  const data = await invModel.getItemByIdErr()
  res.render("error"), {
    // title: `${data[0].inv_make}`,
    nav
  }
}

/* ***************************
 *  Build Inventory Manager
 * ************************** */
invCont.buildMangement = async function (req, res, next){
  const grid = await utilities.buildManagementView()
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ***************************
 *  Add New Class
 * ************************** */
invCont.buildNewClass = async function (req, res, next){
  const grid = await utilities.buildManagementView()
  let nav = await utilities.getNav()
  res.render("inventory/addClassification", {
    title: " Add New Catalog",
    nav,
    grid,
    errors: null
  })
}

invCont.addClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  let select = await utilities.getClassificationSelect()
  const {classification_name} = req.body
  const addResult = await invModel.addClass(classification_name)
  console.log(addResult)
  if(addResult) {
    req.flash(
      "notice",
      `Congratulations! You added ${classification_name} to the catalog.`
    )
    res.status(201).render("inventory/management", {
      title: "Add New Item",
      errors: null,
      nav
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/addClassification", {
      title: "Add New Catalog",
      nav,
      errors: null 
    })
  }
}

/* ***************************
 *  Add New Inventory Item
 * ************************** */
invCont.buildNewItem = async function (req, res, next) {
  let select = await utilities.getClassificationSelect()
  let nav = await utilities.getNav()
  res.render("inventory/addNewItem",{
    title: "Add New Inventory Item",
    nav,
    select,
    options,
    errors: null
  })
}

invCont.addItem = async function (req, res, next){
  let nav = await utilities.getNav()
  let select = await utilities.getClassificationSelect()
  let options = await utilities.getClasses()
  const {classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color} = req.body
  const addResult = await invModel.addItem(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)
  console.log(addResult)
  if(addResult) {
    req.flash(
      "notice",
      `Congratulations! You added a NEW Item!`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      errors: null,
      nav
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/addNewItem", {
      title: "Add New Item",
      nav,
      select,
      options,
      errors: null 
    })
  }
}

module.exports = invCont