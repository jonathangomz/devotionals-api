const express = require("express");
const BookService = require("../Services/Books");
const secured = require("./middleware/secured");
const apiCodes = require("./ERROR_CODES");
const router = express.Router();

const path = "/api/v1/books";

const booksServices = new BookService();

router.use(secured());

router.get("/", async (req, res) => {
  let {
    year,
    author,
  } = req.query;

  const params = {};

  if(year) params.year = year;
  if(author) params.author = author;

  const books = await booksServices.getBookByParams(params);

  res.status(books ? 200 : 404);
  res.json(books || {
    errorCode: apiCodes.NOT_FOUND.BOOK,
    message: "Not found nothing with that parameters"
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await booksServices.getBook(id);

  res.status(book ? 200 : 404);
  res.json(book || {
    errorCode: apiCodes.NOT_FOUND.BOOK,
    message: "Not found any book with that id"
  });
});

router.get("/:id/devotionals", async (req, res) => {
  const id = req.params.id;

  const devotionals = await booksServices.getDevotionals(id, req.query);

  res.status(devotionals ? 200 : 404);
  res.json(devotionals || {
    errorCode: apiCodes.NOT_FOUND.DEVOTIONAL,
    message: `Not found any devotional`
  });
});

module.exports = {
  path,
  router
};