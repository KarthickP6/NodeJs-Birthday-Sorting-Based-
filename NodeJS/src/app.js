const express = require("express");
const birthdaysRouter = require("./routers/birthdays");
require("./mongoose/db/mongoose");

const app = express();

app.use(express.json());
app.use(birthdaysRouter);

module.exports = app;