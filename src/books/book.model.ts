import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({
    type: SchemaTypes.ObjectId
  })
  _id: string;

  @Prop()
  id: number;

  @Prop([String])
  authors: string[];

  @Prop()
  title: string;

  @Prop()
  year: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop()
  stolen_from: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);