import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ slug: 'name', unique: true, index: true })
  slug: string;

  //   @Prop()
  //   parent: Category;
  //   @Prop({required: true})
  //   main: boolean;

  //   @Prop([Category])
  //   children: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
