const router = require('express').Router();

const path = "";

router.get("", (req, res) => {
  let base_uri = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;
  
  if (port === 3000) {
    base_uri += ':' + port;
  }

  res.json({
    next: `${base_uri}/api/v1/books`
  });
});

module.exports = {
  path,
  router,
}