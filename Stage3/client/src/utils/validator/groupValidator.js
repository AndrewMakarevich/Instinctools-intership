import validateText from '.';

class GroupValidator {
  static validatedGroupName(groupName, throwError) {
    return validateText(
      '^[a-zA-Z0-9.-]{4,20}$',
      null,
      null,
      groupName,
      throwError,
      "Group name doesn't match to the required patern"
    );
  }

  static validateGroupTitle(groupTitle, throwError) {
    return validateText(
      '^[a-zA-Z0-9.-]{6,20}$',
      null,
      null,
      groupTitle,
      throwError,
      "Group Title doesn't match to the required patern"
    );
  }
}

export default GroupValidator;
