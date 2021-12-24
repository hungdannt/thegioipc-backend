import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose } from "mongoose";
import * as mongoose from "mongoose";
import { Category } from "src/api/category/schemas/category.schema";
import { type } from "os";

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })
export class Product {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ slug: "name", unique: true, index: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: { thumbnail: String, original: String } })
  image: { thumbnail: string; original: string };

  @Prop()
  gallery: [{ thumbnail: string; original: string }];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true
    }
  ])
  category: Category[];

  @Prop()
  countInStock: number;

  @Prop()
  count: number;

  @Prop()
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
