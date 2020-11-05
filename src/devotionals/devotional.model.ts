import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type DevotionalDocument = Devotional & Document;

@Schema()
export class Devotional {
  @Prop({
    type: SchemaTypes.ObjectId
  })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  date: string;

  @Prop()
  vers: string;

  @Prop([String])
  content: string[];

  @Prop({
    type: SchemaTypes.ObjectId
  })
  book: string;
}

export const DevotionalSchema = SchemaFactory.createForClass(Devotional);