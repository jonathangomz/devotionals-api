const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtSecurity = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://jonathangomz.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://devotionals-api.herokuapp.com',
  issuer: 'https://jonathangomz.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtSecurity;