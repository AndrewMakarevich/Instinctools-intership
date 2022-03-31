const ApiError = require("../apiError/apiError.js");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};