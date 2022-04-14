const parseDataToEdit = (initialParamsObj, paramsToEditObj) => {
  const groupedObj = {};
  for (let param in paramsToEditObj) {
    if (
      paramsToEditObj[param] &&
      paramsToEditObj[param] !== initialParamsObj[param]
    ) {
      groupedObj[param] = paramsToEditObj[param];
    }
  }

  return groupedObj;
};

export default parseDataToEdit;
