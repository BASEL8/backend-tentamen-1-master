/* eslint-disable class-methods-use-this */
let db = require("../db/db");

class ShoppingController {
  getAllShoppingList(req, res) {
    const qs = req.query;
    let page = parseInt(qs.page);
    let size = parseInt(qs.size);

    if (!page) page = 1;
    if (!size) size = 10;

    let data = db;
    let results = data.slice((page - 1) * size, page * size);

    res.status(200).json({ shoppingList: results });
  }

  getItem(req, res) {
    const name = req.params.name;
    db.map((item) => {
      if (item.name === name) {
        return res.status(200).json(item);
      }
    });
    return res.status(404).send({
      success: "false",
      message: "shoppingList does not exist"
    });
  }

  createItem(req, res) {
    if (!req.body.name) {
      return res.status(400).send({
        success: "false",
        message: "name is required"
      });
    } else if (!req.body.amount) {
      return res.status(400).send({
        success: "false",
        message: "amount is required"
      });
    }
    const itemIndex = db.findIndex((item) => item.name === req.body.name);
    if (itemIndex !== -1) {
      let item = {
        name: db[itemIndex].name,
        amount: db[itemIndex].amount + req.body.amount
      };
      db[itemIndex] = item;
      res.status(200).send(db[itemIndex]);
    } else {
      const item = {
        name: req.body.name,
        amount: req.body.amount
      };
      db.push(item);
      return res.status(201).json(item);
    }
  }
  updateItem(req, res) {
    const name = req.params.name;
    let itemFound;
    let itemIndex;
    db.map((item, index) => {
      if (item.name === name) {
        itemFound = item;
        itemIndex = index;
      }
    });
    if (!itemFound) {
      return res.status(404).send({
        success: "false",
        message: "item not found"
      });
    }

    if (!req.body.name) {
      return res.status(400).send({
        success: "false",
        message: "name is required"
      });
    } else if (!req.body.amount) {
      return res.status(400).send({
        success: "false",
        message: "amount is required"
      });
    }

    const newItem = {
      name: req.body.name,
      amount: req.body.amount
    };

    db.splice(itemIndex, 1, newItem);

    return res.status(201).json(newItem);
  }

  deleteItem(req, res) {
    const name = req.params.name;
    let itemFound;
    let itemIndex;
    db.map((item, index) => {
      if (item.name === name) {
        itemFound = item;
        itemIndex = index;
      }
    });

    if (!itemFound) {
      return res.status(404).send({
        success: "false",
        message: "item not found"
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: "true",
      message: "item deleted successfully"
    });
  }
  deleteAll(req, res) {
    db = [];
    res.status(200).send(db);
  }
}

const shoppingController = new ShoppingController();
module.exports = shoppingController;
