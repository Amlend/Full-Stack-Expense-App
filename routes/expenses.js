const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");

router.get("/", expenseController.getExpensesPage);
router.post("/register", expenseController.postExpenses);

module.exports = router;
