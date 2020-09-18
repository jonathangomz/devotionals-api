const router = require('express').Router();
const ERRCodes = require("../ERROR_CODES");
const BookService = require("../services/Books");
const jwtSecurity = require("../security");

const booksServices = new BookService();
router.use(jwtSecurity);

const path = 'today';

router.get('/', async (req, res) => {
  const devotionals = await booksServices.getDailyDevotionals();
  
  res.status(devotionals ? 200 : 404);
  res.json(devotionals || {
    errorCode: ERRCodes.NOT_FOUND.DEVOTIONAL,
    message: `That's strange. Not found any devotional for today`
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const devotional = await booksServices.getDailyDevotional(id);

  res.status(devotional ? 200 : 404);
  res.json(devotional || {
    errorCode: ERRCodes.NOT_FOUND.DEVOTIONAL,
    message: `Not found any devotional for today in the book with id ${id}`
  });
});

module.exports = {
  path,
  router,
}