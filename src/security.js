require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// A) Security to API Auth0
const jwtSecurity = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://jonathangomz.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://devotionals-api.herokuapp.com/api/v1',
  issuer: 'https://jonathangomz.auth0.com/',
  algorithms: ['RS256']
});

// B) JWT Passport for Application Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'https://devotionals-api.herokuapp.com/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

// A.1) Storing and retrieving user data from the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// C) Basic session configuration for express
const sessionConfig = {
  secret: 'Devotinal API for personal use',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

// exports
module.exports = {
  jwtSecurity,
  passport,
  sessionConfig,
};