const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.i4mh4vu.mongodb.net/`
  )
    .then((client) => {
      console.log(console.log("Connected"));
      // This is to keep the connection alive and not having to connect the db each time
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
