const correctUserObj = {
  username: "AndrewTheFirst",
  firstName: "Andrew",
  lastName: "Makarevich",
  email: "andrei1@mail.ru"
}

const alterCorrectUserObj = {
  username: "AndrewTheSecond",
  firstName: "Andrew",
  lastName: "Makarevich",
  email: "andrei2@mail.ru"
}

const incorrectUserObj = {
  username: "a",
  firstName: "AndrewLalalalalalaalalala",
  lastName: "Makarevich",
  email: "andrei1@mail@.ru"
}

const correctGroupObj = {
  groupName: "Fourth-group",
  groupTitle: "Test-group"
};

const alterCorrectGroupObj = {
  groupName: "Fifth-group",
  groupTitle: "Test-group-alter"
}

const incorrectGroupObj = {
  groupName: "aa",
  groupTitle: "a"
};

module.exports = {
  correctUserObj,
  alterCorrectUserObj,
  incorrectUserObj,
  correctGroupObj,
  alterCorrectGroupObj,
  incorrectGroupObj
}