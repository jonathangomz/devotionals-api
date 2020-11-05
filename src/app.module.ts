import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { DevotionalsController } from './devotionals/devotionals.controller';
import { DevotionalsService } from './devotionals/devotionals.service';
import { DevotionalsModule } from './devotionals/devotionals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService],
    }),
    BooksModule,
    DevotionalsModule,
  ],
})
export class AppModule {}
