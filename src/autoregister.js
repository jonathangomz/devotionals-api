const path = require('path');
const fs = require('fs');

module.exports = (app, prefix = '/api/v1', pathEndpoints = 'routes') => {
  const endpointsPath = path.join(__dirname, pathEndpoints);
  fs.readdirSync(endpointsPath).forEach((file) => {
    let { path, router } = require(`./${pathEndpoints}/` + file);
    app.use(`${prefix}/${path}`, router);
  })
}