const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const routes = require("./routes/index");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

module.exports = app;
