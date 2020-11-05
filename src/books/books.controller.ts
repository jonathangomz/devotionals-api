import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

  constructor(private bookService: BooksService) {}

  @Get()
  findAll(@Res() res: Response): void {
    this.bookService.findAll()
    .then((books) => {
      res.status(HttpStatus.OK).json(books);
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string): void {
    this.bookService.findOne(id)
    .then((book) => {
      if(book)
        res.status(HttpStatus.OK).json(book);
      else
        res.status(HttpStatus.NOT_FOUND).json({});
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err))
  }
}
