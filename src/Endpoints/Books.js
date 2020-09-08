const express = require("express");
const BookService = require("../Services/Books");
const router = express.Router();

const path = "/api/v1/books";

const booksServices = new BookService();

router.get("/", async (req, res) => {
  let {
    year,
    author,
  } = req.query;

  const params = {};

  if(year) params.year = year;
  if(author) params.author = author;

  const books = await booksServices.getBookByParams(params);

  res.json(books || {
    message: "Not found nothing with that parameters"
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const book = await booksServices.getBook(id);

  res.json(book || {
    message: "Not found any book with that id"
  });
});

router.get("/api/v1/books/:id/devotionals", async (req, res) => {
  const id = req.params.id;

  const devotionals = await booksServices.getDevotionals(id, req.query);

  res.json(devotionals || {
    message: `Not found any devotioanl in the id ${id}`
  });
});

module.exports = {
  path,
  router
};