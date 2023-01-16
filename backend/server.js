const express = require("express");
const Sequelize = require("sequelize");
const app = express();


require("dotenv").config();

//=======Sequelize setup

const database = "art";
const username = "root";
const password = "root";

console.log(database);

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

const authentication = sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
