import validateText from '.';

class UserValidator {
  static validateUsername(username, throwError) {
    return validateText(
      '^[a-zA-Z0-9.,-]{4,20}$',
      null,
      null,
      username,
      throwError,
      "Username doesn't match to the specified pattern",
    );
  }

  static validateFirstName(firstName, throwError) {
    return validateText(
      '^[a-zA-Z]+s?[a-zA-Z]+$',
      2,
      20,
      firstName,
      throwError,
      "First name doesn't match to the specified pattern",
    );
  }

  static validateLastName(lastName, throwError) {
    return validateText(
      '^[a-zA-Z]+$',
      2,
      20,
      lastName,
      throwError,
      "Last name doesn't match to the specified pattern",
    );
  }

  static validateEmail(email, throwError) {
    return validateText(
      "^[a-zA-Z0-9!#$%&'*+-/=?^_`{}|]{1,65}@([a-zA-Z0-9]+.){1,2}[a-zA-Z]{2,14}$",
      null,
      null,
      email,
      throwError,
      "Email doesn't match to the specified pattern",
    );
  }
}

export default UserValidator;
