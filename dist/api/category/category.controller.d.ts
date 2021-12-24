import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category-dto';
export declare class CategoryController {
    private readonly catService;
    constructor(catService: CategoryService);
    create(categoryDto: CategoryDto): Promise<void>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    findOneBySlug(slug: string): Promise<Category>;
    update(id: string, updateCatDto: CategoryDto): Promise<Category>;
    remove(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
