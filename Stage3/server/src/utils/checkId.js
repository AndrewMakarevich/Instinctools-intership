const ApiError = require('../apiError/apiError');

function checkId(id, errorMessage) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    throw ApiError.badRequest(errorMessage);
  }
}

module.exports = checkId;
