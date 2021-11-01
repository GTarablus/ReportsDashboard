const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger.service.js');

module.exports = {
  getCollection,
  getNumOfDocs,
};

const dbURL =
  'mongodb+srv://gil:Frd9jTZB2VPJkK9@cluster0.ugz3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'reports_db';
var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function getNumOfDocs(collectionName) {
  try {
    const db = await connect();
    const count = await db.collection(collectionName).count();
    return count;
  } catch (err) {
    logger.error('Failed to get Mongo collection coount', err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    logger.error('Cannot Connect to DB', err);
    throw err;
  }
}
