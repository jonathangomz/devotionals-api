import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { DevotionalsModule } from './devotionals/devotionals.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');

        if (!uri) {
          throw new Error(
            'MONGODB_URI is not set. Copy .env.example to .env and set MONGODB_URI to your MongoDB connection string.',
          );
        }

        return { uri };
      },
    }),
    HomeModule,
    BooksModule,
    DevotionalsModule,
  ],
})
export class AppModule {}
