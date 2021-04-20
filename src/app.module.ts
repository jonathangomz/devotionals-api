import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { DevotionalsModule } from './devotionals/devotionals.module';
import { HomeModule } from './home/Home.module';

const MONGODB_URI = 'mongodb+srv://public:Wb3RBrv0hKPCAGWw@cluster0.80fv7.mongodb.net/devotionals?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    HomeModule,
    BooksModule,
    DevotionalsModule,
  ],
})
export class AppModule {}
