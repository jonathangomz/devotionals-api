require('dotenv').config();
const express = require("express");
const app = express();
const jwtSecurity = require("./security");

app.use(express.json());

app.get("", (req, res) => res.json({
  path: "/api/v1/"
}));

app.get("/api/v1/", (req, res) => {
  res.json({
    path
  });
});

// TODO: use autoregister
const {path, router} = require("./Endpoints/Books");
app.use(path, jwtSecurity, router);

module.exports = app;