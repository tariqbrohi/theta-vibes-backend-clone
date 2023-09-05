const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get("/categories", categoryController.getAllCategories);

module.exports = router;
