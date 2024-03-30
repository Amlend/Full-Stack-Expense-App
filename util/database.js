const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-app", "root", "riverdale", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
