function validateText(
  regExp,
  minLength,
  maxLength,
  valueToValidate,
  throwError,
  errorMessage
) {
  if (valueToValidate === undefined) {
    return true;
  }

  const regEx = new RegExp(regExp);

  if (minLength) {
    if (valueToValidate.length < minLength) {
      throw Error(errorMessage);
    }
  }

  if (maxLength) {
    if (valueToValidate > maxLength) {
      throw Error(errorMessage);
    }
  }

  if (!regEx.test(valueToValidate)) {
    if (throwError) {
      throw Error(errorMessage);
    }

    return false;
  }

  return true;
}

export default validateText;
