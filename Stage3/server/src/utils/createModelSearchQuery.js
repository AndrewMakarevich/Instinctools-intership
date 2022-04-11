const ApiError = require('../apiError/apiError');

function createModelSearchQuery(obj) {
  if (!obj) {
    return {};
  }

  let parsedObj;
  if (obj) {
    try {
      parsedObj = JSON.parse(obj);
    } catch (e) {
      throw ApiError.badRequest(e);
    }
  }

  const finalObject = {};

  function fillFinalObject(mockObj, paramName = '') {
    for (const objKey in mockObj) {
      if (!Object.prototype.hasOwnProperty.call(mockObj, objKey)) {
        continue;
      }

      if (typeof mockObj[objKey] === 'object') {
        const newParamName = paramName.length
          ? `${paramName}.${objKey}`
          : objKey;

        return fillFinalObject(mockObj[objKey], newParamName);
      }

      const finalObjectParamName = paramName.length
        ? `${paramName}.${objKey}`
        : objKey;
      const numberRange = mockObj[objKey].split('|');

      if (numberRange.length !== 2) {
        finalObject[finalObjectParamName] = { $regex: mockObj[objKey] };
      } else {
        if (Number(numberRange[0])) {
          finalObject[finalObjectParamName] = {
            ...finalObject[finalObjectParamName],
            $gte: numberRange[0],
          };
        }

        if (Number(numberRange[1])) {
          finalObject[finalObjectParamName] = {
            ...finalObject[finalObjectParamName],
            $lte: numberRange[1],
          };
        }
      }
    }
  }

  fillFinalObject(parsedObj);

  return finalObject;
}

module.exports = createModelSearchQuery;
