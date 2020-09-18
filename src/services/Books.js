const mongoose = require('mongoose');
const Book = require('../models/Book');
const DevotionalsService = require('./Devotionals');

class BookService {
  #devotionalsService = new DevotionalsService();

  async getBook(id) {
    let book;
    
    if (mongoose.isValidObjectId(id)) // if search by default _id from mongo
      book = await Book.findById(id);

    else if (!isNaN(id)) // if search by custom id
      book = await Book.findOne({
        id: parseInt(id)
      });

    return book;
  }

  async getBookByParams(params, exclude) {
    const to_exclude = {};
    exclude.map(ex => to_exclude[ex] = 0);

    const all = await Book.find({
      ...params
    }, to_exclude);

    return all.length > 0 ? all : undefined;
  }

  async getDevotionals(bookId, params = undefined) {
    const book = await this.getBook(bookId);
    let devotionals;
    
    if(book)
      devotionals = this.#devotionalsService.filterDevotionalsByParams(book, params);

    return (params && devotionals) || (book && book.devotionals) || undefined;
  }

  async getDevotionalById(bookId, id) {
    const book = await this.getBook(bookId);
    let devotional;
    
    if(mongoose.isValidObjectId(id) && book && book.devotionals)
      devotional = this.#devotionalsService.getById(book.devotionals, id);

    return devotional;
  }

  async getDailyDevotional(id) {
    const book = await this.getBook(id);
    let devotional;

    if(book && book.get('devotionals'))
      devotional = this.#devotionalsService.getToday(book.get('devotionals'));
      
    return devotional;
  }

  async getDailyDevotionals() {
    const books = await this.getBookByParams({year: new Date().getFullYear()}, ['year']);
    let devotionals = [];

    if(books){
      for(const book of books) {
        const devotional = this.#devotionalsService.getToday(book.get('devotionals'));
        devotionals.push({
          _id: book._id,
          title: book.get('title'),
          author: book.get('author'),
          category: book.get('category'),
          image: book.get('image'),
          devotionals: [
            devotional
          ]
        });
      }
    }
    return devotionals;
  }
}

module.exports = BookService;