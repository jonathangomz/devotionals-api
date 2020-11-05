import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, isValidObjectId, Model } from 'mongoose';
import { Book, BookDocument } from './book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(projections: {} = {}): Promise<Book[]> {
    return this.bookModel.find({}, projections);
  }

  async findOne(id: string, projections: {} = {}): Promise<Book> {
    return this.bookModel.findById(id, projections);
  }
}
