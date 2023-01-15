const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const axios = require("axios");
//var fs = require("fs");

require("dotenv").config();

//=======Sequelize setup

const database = "postgres";
const username = "postgres";
const password = "superuser";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//=======Deviantart setup

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const scope = process.env.SCOPE;

const daPort = 3001;

//const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

const authUrl = `https://www.deviantart.com/oauth2/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=basic`;

const response = async () => {
  await axios.post(
    "https://www.deviantart.com/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: client_id,
      client_secret: client_secret,
    })
  );
};

console.log(response);

// const authOptions = {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   auth: {
//     username: client_id,
//     password: client_secret,
//   },
// };

// const data = `grant_type=client_credentials`;

// axios
//   .post("https://www.deviantart.com/oauth2/token", data, authOptions)
//   .then((response) => {
//     console.log(response.data);
//     // Use the access_token in the response to make API requests
//   })
//   .catch((error) => {
//     console.log(error);
//   });
