const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const api_routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/", api_routes);

module.exports = app;
