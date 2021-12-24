import { Document } from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
    slug: string;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any, any>, import("mongoose").Model<Document<Category, any, any>, any, any>, undefined, {}>;
