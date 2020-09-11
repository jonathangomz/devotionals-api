const apiCodes = require("./ERROR_CODES");

module.exports = function (err, req, res, next) {
  if(err.name === "UnauthorizedError") {
    res.status(401).json({
      errorCode: apiCodes.UNAUTHORIZED,
      message: "No authorization for the endpoint"
    })
  } else next(err);
}