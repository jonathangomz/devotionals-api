const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
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

module.exports = jwtCheck;