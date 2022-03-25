import mongoose from "mongoose";
import ApiError from "../apiError/apiError";

export function connectToTheMongoDB() {
  mongoose.connect("mongodb://localhost:27017/admin-panel-test-task", () => {
    console.log("Connected to the mongoDB");
  });
}

async function checkForTheDuplication(Model, document, fieldsToCheck) {
  for (let filedVal of fieldsToCheck) {
    const duplicate = await Model.findOne({
      [filedVal]: document[filedVal]
    });
    if (duplicate) {
      throw ApiError.badRequest(`${filedVal} for ${Model.collection.name} must be unique`);
    }
  }
  // try {
  //   fieldsToCheck.forEach(async (field) => {
  //     const duplicate = await Model.findOne({
  //       [field]: document[field]
  //     });
  //     if (duplicate) {
  //       throw ApiError.badRequest(`${field} for ${Model.collection.name} must be unique`);
  //     }
  //   });
  // } catch (e) {
  //   throw ApiError.badRequest(`Error`);
  // }

}

const create = mongoose.Model.create;

mongoose.Model.create = async function (docs, options, callback) {
  if (options && options.checkForDuplications) {
    await checkForTheDuplication(this, docs, options.checkForDuplications);
  }
  return create.apply(this, arguments);
};