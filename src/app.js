require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("", (req, res) => {
  let base_uri = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;
  if (app.get("env") !== 'production' && port !== undefined && port !== 80 && port !== 443) {
    base_uri += ':' + port;
  }

  res.json({
    next: `${base_uri}/api/v1/`
  })
});

app.get("/api/v1/", (req, res) => {
  let base_uri = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;
  if (app.get("env") !== 'production' && port !== undefined && port !== 80 && port !== 443) {
    base_uri += ':' + port;
  }

  res.json({
    next: `${base_uri}${path}`
  });
});

/** TODO_START: Use autoregister  */
const {
  path,
  router
} = require("./Endpoints/Books");
app.use(`/api/v1${path}`, router);

const unauthorized = require("./Endpoints/Unauthorized");
app.use(unauthorized);
/** TODO_END */


module.exports = app;