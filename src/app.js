require('dotenv').config();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require("express");

const apiCodes = require('./ERROR_CODES');
const autoregister = require('./autoregister');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

// Register all routers
autoregister(app, "/api/v1");

// Fallback for unauthorized request
app.use(function (err, req, res, next) {
  if(err.name === "UnauthorizedError") {
    res.status(401).json({
      errorCode: apiCodes.UNAUTHORIZED,
      message: "No authorization for the endpoint"
    })
  } else next(err);
});

module.exports = app;