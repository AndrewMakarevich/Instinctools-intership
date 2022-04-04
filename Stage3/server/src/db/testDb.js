const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


async function GetMongoMemoryServer() {
  const server = await MongoMemoryServer.create();

  async function connect() {
    const mongoUrl = server.getUri()
    await mongoose.connect(mongoUrl);
  }

  async function disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    await server.stop();
  }

  async function cleanDataBase() {
    const collections = await mongoose.connection.collections;
    for (let collectionKey in collections) {
      await collections[collectionKey].deleteMany();
    }
  }

  return {
    server,
    connect,
    disconnect,
    cleanDataBase
  }
}



module.exports = GetMongoMemoryServer
