import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { DevotionalsService } from './devotionals.service';

@Controller('devotionals')
export class DevotionalsController {

  constructor(private devotionalsService: DevotionalsService) {}

  @Get()
  findAll(@Res() res: Response): void {
    this.devotionalsService.findAll()
    .then((devotionals) => res.status(HttpStatus.OK).json(devotionals))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
  }

}
