const db = require("./connection");

const book_schema = new db.Schema({
  author: {
    type: Array,
  },
  year: {
    type: Number,
  },
  category: {
    type: String
  },
  stolen_from: {
    type: String
  },
  image: {
    type: String
  },
  devotionals: {
    type: {
      title: {
        type: String,
      },
      content: {
        type: Array,
      },
      date: {
        type: String
      },
      vers: {
        type: String,
      }
    },
  }
});

const book = db.model("books", book_schema);

module.exports = book;