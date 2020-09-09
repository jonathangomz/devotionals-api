require('dotenv').config();
const express = require("express");
const session = require('express-session');
const {
  jwtSecurity,
  passport,
  sessionConfig
} = require("./security");

const app = express();

app.use(express.json());

// Session express
if (app.get("env") === 'production') sessionConfig.cookie.secure = true;
app.use(session(sessionConfig));

// Passport
app.use(passport.initialize());
app.use(passport.session());

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

// TODO: use autoregister
const {
  pathAuth,
  routerAuth
} = require("./Endpoints/Auth");
app.use(pathAuth, routerAuth);

const {
  path,
  router
} = require("./Endpoints/Books");
app.use(path, router);

module.exports = app;