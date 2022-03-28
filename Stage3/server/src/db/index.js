import mongoose from "mongoose";
import ApiError from "../apiError/apiError";

export function connectToTheMongoDB() {
  mongoose.connect("mongodb://localhost:27017/admin-panel-test-task", () => {
    console.log("Connected to the mongoDB");
  });
}

async function checkForTheDuplication(Model, document, fieldsToCheck) {

  async function findDuplicate(document, paramName) {
    const duplicate = await Model.findOne({
      [paramName]: document[paramName]
    });

    if (duplicate) {
      throw ApiError.badRequest(`${paramName} for ${Model.collection.name} must be unique`);
    }
  }

  for (let fieldVal of fieldsToCheck) {
    if (!Model.schema.obj[fieldVal]) {
      continue;
    }

    if (Array.isArray(document)) {

      for (let docVal of document) {
        await findDuplicate(docVal, fieldVal);
      }

    }

    await findDuplicate(document, fieldVal);
  }

}

// OVERWRITE mongoose.Model.create method

const create = mongoose.Model.create;

mongoose.Model.create = async function (docs, options, callback) {
  if (options && options.checkForDuplications) {
    await checkForTheDuplication(this, docs, options.checkForDuplications);
  }

  return create.apply(this, arguments);
};