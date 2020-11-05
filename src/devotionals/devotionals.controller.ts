import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
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

  @Get('today')
  findToday(@Res() res: Response): void {
    this.devotionalsService.findToday()
    .then((devotionals) => res.status(HttpStatus.OK).json(devotionals))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string): void {
    this.devotionalsService.findOne(id)
    .then((devotional) => {
      if(devotional)
        res.status(HttpStatus.OK).json(devotional)
      else
        res.status(HttpStatus.NOT_FOUND).json({})
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
  }
}
