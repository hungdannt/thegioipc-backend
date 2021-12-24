import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Category } from "src/api/category/schemas/category.schema";
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    slug: string;
    description: string;
    price: number;
    image: {
        thumbnail: string;
        original: string;
    };
    gallery: [{
        thumbnail: string;
        original: string;
    }];
    category: Category[];
    countInStock: number;
    count: number;
    status: string;
}
export declare const ProductSchema: mongoose.Schema<Document<Product, any, any>, mongoose.Model<Document<Product, any, any>, any, any>, undefined, {}>;
