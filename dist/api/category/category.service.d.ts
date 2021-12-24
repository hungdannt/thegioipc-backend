import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CategoryDto } from './dtos/category-dto';
export declare class CategoryService {
    private catModel;
    constructor(catModel: Model<CategoryDocument>);
    create(categoryDto: CategoryDto): Promise<Category>;
    update(categoryDto: CategoryDto, id: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    findOneBySlug(slug: string): Promise<Category>;
    deleteOne(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
