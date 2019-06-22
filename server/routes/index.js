const express = require("express");
const ShoppingController = require("../shoppingController/index");

const router = express.Router();

router.get("/shopping", ShoppingController.getAllShoppingList);
router.get("/shopping/:name", ShoppingController.getItem);
router.post("/shopping", ShoppingController.createItem);
router.put("/shopping/:name", ShoppingController.updateItem);
router.delete("/shopping/", ShoppingController.deleteAll);
router.delete("/shopping/:name", ShoppingController.deleteItem);

module.exports = router;
