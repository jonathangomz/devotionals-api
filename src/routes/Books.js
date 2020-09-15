const express = require("express");
const BookService = require("../services/Books");
const jwtSecurity = require("../security");
const ERRCodes = require("./ERROR_CODES");
const router = express.Router();

const path = "/books";

const booksServices = new BookService();

router.use(jwtSecurity);

router.get("/", async (req, res) => {
  let {
    year,
    author,
    exclude,
  } = req.query;

  const params = {};

  if (year) params.year = year;
  if (author) params.author = author;

  if (!exclude) exclude = [];
  if(!Array.isArray(exclude)) exclude = [exclude];

  const books = await booksServices.getBookByParams(params, exclude);

  res.status(books ? 200 : 404);
  res.json(books || {
    errorCode: ERRCodes.NOT_FOUND.BOOK,
    message: "Not found nothing with that parameters"
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await booksServices.getBook(id);

  res.status(book ? 200 : 404);
  res.json(book || {
    errorCode: ERRCodes.NOT_FOUND.BOOK,
    message: "Not found any book with that id"
  });
});

router.get("/:id/devotionals", async (req, res) => {
  const id = req.params.id;

  const devotionals = await booksServices.getDevotionals(id, req.query);

  res.status(devotionals ? 200 : 404);
  res.json(devotionals || {
    errorCode: ERRCodes.NOT_FOUND.DEVOTIONAL,
    message: `Not found any devotional`
  });
});

router.get("/:book_id/devotionals/:id", async (req, res) => {
  const {
    book_id,
    id
  } = req.params;

  const devotionals = await booksServices.getDevotionalById(book_id, id);

  res.status(devotionals ? 200 : 404);
  res.json(devotionals || {
    errorCode: ERRCodes.NOT_FOUND.DEVOTIONAL,
    message: `Not found any devotional`
  });
});

module.exports = {
  path,
  router
};