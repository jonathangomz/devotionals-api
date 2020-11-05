import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Devotional, DevotionalSchema } from './devotional.model';
import { DevotionalsController } from './devotionals.controller';
import { DevotionalsService } from './devotionals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Devotional.name,
        schema: DevotionalSchema,
      }
    ])
  ],
  controllers: [DevotionalsController],
  providers: [DevotionalsService]
})
export class DevotionalsModule {}
