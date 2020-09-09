require('dotenv').config();
const express = require("express");
const session = require('express-session');
const {jwtSecurity, passport, sessionConfig} = require("./security");

const app = express();

app.use(express.json());

// Session express
if(app.get("env") === 'production') sessionConfig.cookie.secure = true;
console.log(app.get("env"));
app.use(session(sessionConfig));

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("", (req, res) => res.json({
  path: "/api/v1/"
}));

app.get("/api/v1/", (req, res) => {
  res.json({
    path
  });
});

// TODO: use autoregister
const {pathAuth, routerAuth} = require("./Endpoints/Auth");
app.use(pathAuth, routerAuth);

const {path, router} = require("./Endpoints/Books");
app.use(path, router);

module.exports = app;