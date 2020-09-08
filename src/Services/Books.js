const Book = require('../Models/Book');
const DevotionalsService = require('./Devotionals');

class BookService {
  async getBook(id) {
    let book;
    
    if (Book.isValidObjectId(id)) // if search by default _id from mongo
      book = await Book.findById(id);

    else if (!isNaN(id)) // if search by custom id
      book = await Book.findOne({
        id: parseInt(id)
      });

    return book;
  }

  async getBookByParams(params) {
    const all = await Book.find({
      ...params
    });

    return all.length > 0 ? all : undefined;
  }

  async getDevotionals(bookId, params = undefined) {
    const book = await this.getBook(bookId);
    let devotionals;
    
    if(book){
      const devotionalsService = new DevotionalsService();
      devotionals = devotionalsService.filterDevotionalsByParams(book, params);
    }

    return params && devotionals || book.devotionals;
  }
}

module.exports = BookService;