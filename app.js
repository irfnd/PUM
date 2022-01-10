const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const backend = require("./backend/core");
const frontend = require("./frontend/client");

app.use(backend);
app.use(frontend);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
  })
  .then(() => {
    app.listen(process.env.PORT || 80, () => {
      console.log("> Server Running on Port 80");
      console.log("> Connected to Database\n");
    });
  })
  .catch((e) => console.log(e));
