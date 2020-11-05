import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devotional, DevotionalDocument } from './devotional.model';

@Injectable()
export class DevotionalsService {

  constructor(@InjectModel(Devotional.name) private devotionalModel: Model<DevotionalDocument>) {}

  async findAll(projections: {} = {}): Promise<Devotional[]> {
    return this.devotionalModel.find({}, projections);
  }

  async findAllWithQuery(query: {} = {}, projections: {} = {}): Promise<Devotional[]> {
    return this.devotionalModel.find(query, projections);
  }

  async findAllFromBook(bookId: string, projections: {} = {}): Promise<Devotional[]> {
    return this.devotionalModel.find({ book: bookId }, projections);
  }

  async findOne(id: string, projections: {} = {}): Promise<Devotional> {
    return this.devotionalModel.findById(id, projections);
  }

  async findToday(projections: {} = {}): Promise<Devotional[]> {
    const today: string = new Date().toISOString().split('T')[0];
    return this.devotionalModel.find({ date: today }, projections);
  }
}
