const parseDataToEdit = (initialParamsObj, paramsToEditObj) => {
  const groupedObj = {};

  Object.keys(paramsToEditObj).forEach((paramKey) => {
    if (
      paramsToEditObj[paramKey] &&
      paramsToEditObj[paramKey] !== initialParamsObj[paramKey]
    ) {
      groupedObj[paramKey] = paramsToEditObj[paramKey];
    }
  });

  return groupedObj;
};

export default parseDataToEdit;
