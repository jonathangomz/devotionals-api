require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {
  ObjectId
} = require('mongodb');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

module.exports = setBookId = (bookId, year) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.80fv7.mongodb.net/devotionals?authSource=admin&replicaSet=atlas-ryfsyj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function(connectErr, client) {
      assert.strictEqual(null, connectErr);
      const coll = client.db('devotionals').collection('devotionals');
      await coll.updateMany({ date: year }, {
        $set: {
          'book': new ObjectId(bookId)
        }
      }, {
        upsert: false
      });
      client.close();
    });
}