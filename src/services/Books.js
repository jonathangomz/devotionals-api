const mongoose = require('mongoose');
const Book = require('../models/Book');
const DevotionalsService = require('./Devotionals');

class BookService {
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

    console.log(to_exclude);

    const all = await Book.find({
      ...params
    }, to_exclude);

    return all.length > 0 ? all : undefined;
  }

  async getDevotionals(bookId, params = undefined) {
    const book = await this.getBook(bookId);
    let devotionals;
    
    if(book){
      const devotionalsService = new DevotionalsService();
      devotionals = devotionalsService.filterDevotionalsByParams(book, params);
    }

    return (params && devotionals) || (book && book.devotionals) || undefined;
  }

  async getDevotionalById(bookId, id) {
    const book = await this.getBook(bookId);
    let devotional;
    
    if(mongoose.isValidObjectId(id) && book && book.devotionals){
      const devotionalsService = new DevotionalsService();
      devotional = devotionalsService.getById(book.devotionals, id);
    }

    return devotional;
  }
}

module.exports = BookService;