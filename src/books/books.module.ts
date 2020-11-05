import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Devotional, DevotionalSchema } from 'src/devotionals/devotional.model';
import { DevotionalsService } from 'src/devotionals/devotionals.service';
import { Book, BookSchema } from './book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema
      },
      {
        name: Devotional.name,
        schema: DevotionalSchema
      }
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, DevotionalsService]
})
export class BooksModule {}
