const ApiError = require("../apiError/apiError.js");

function createModelSearchQuery(obj) {
  if (!obj) {
    return {};
  }

  if (obj) {
    try {
      obj = JSON.parse(obj);
    } catch (e) {
      throw ApiError.badRequest('Incorrect searcObj query param');
    }
  }

  const finalObject = {};

  function fillFinalObject(obj, paramName = '') {
    for (let objKey in obj) {

      if (typeof obj[objKey] === 'object') {
        paramName = paramName.length ? `${paramName}.${objKey}` : objKey;

        return fillFinalObject(obj[objKey], paramName);
      }

      const finalObjectParamName = paramName.length ? `${paramName}.${objKey}` : objKey;
      const numberRange = obj[objKey].split('|');

      if (numberRange.length !== 2) {
        finalObject[finalObjectParamName] = { $regex: obj[objKey] };
      } else {

        if (Number(numberRange[0])) {
          finalObject[finalObjectParamName] = { ...finalObject[finalObjectParamName], $gte: numberRange[0] };
        }

        if (Number(numberRange[1])) {
          finalObject[finalObjectParamName] = { ...finalObject[finalObjectParamName], $lte: numberRange[1] };
        }
      }
    }
  }

  fillFinalObject(obj);

  return finalObject;
}

module.exports = createModelSearchQuery