/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
function comparison(firstEntity, secEntity) {
  let comparisonResult = true;

  function deepComparison(firstObj, secondObj) {
    if (!comparisonResult) {
      return;
    }

    if (Array.isArray(firstObj) && Array.isArray(secondObj)) {
      firstObj.forEach((item, index) => {
        deepComparison(item, secondObj[index]);
      });
      return;
    }

    if (typeof firstObj === 'object' && typeof secondObj === 'object') {
      Object.keys(firstObj).forEach((objectParam) => {
        deepComparison(firstObj[objectParam], secondObj[objectParam]);
      });
      return;
    }

    if (String(firstObj) === String(secondObj)) {
      return;
    }

    comparisonResult = false;
  }

  deepComparison(firstEntity, secEntity);
  return comparisonResult;
}

function copy(objectToCopy) {
  let copiedObject;

  if (Array.isArray(objectToCopy)) {
    copiedObject = [];
  }

  if (typeof objectToCopy === 'object') {
    copiedObject = {};
  }

  function createObjectCopy(objectToCopy) {
    if (Array.isArray(objectToCopy)) {
      const copiedArr = [];
      objectToCopy.forEach((item, index) => {
        copiedArr.push(createObjectCopy(item));
      });
      return copiedArr;
    }

    if (typeof objectToCopy === 'object') {
      const copiedObject = {};
      Object.keys(objectToCopy).forEach((param) => {
        copiedObject[param] = createObjectCopy(objectToCopy[param]);
      });
      return copiedObject;
    }
    return objectToCopy;
    // if(typeof objectToCopy === "object"){
    //   copiedObject = {}
    // }
  }

  createObjectCopy(objectToCopy, copiedObject);
  return copiedObject;
}

// const firstObject = {
//   name: 'Andrew',
//   secName: 2 + 2 + 2,
//   firstFunc: (number) => number + 1,
//   testArr: [1, 2, 3, { a: 1, b: 1 }],
//   arr: [{ a: 5, b: 6 }, { v: [1, 2, 3] }],
// };

const testArr = [1, 2, { a: 1, b: 2 }];

const copiedObject = copy(testArr);

console.log(copiedObject);

// const secondObject = {
//   name: 'Andrew',
//   secName: 2 * 3,
//   firstFunc: (number) => number + 1,
//   arr: [{ a: 5, b: 6 }, { v: [1, 2, 4] }],
// };

// console.log(comparison(firstObject, secondObject));
