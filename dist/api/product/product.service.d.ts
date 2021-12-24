import { Model } from "mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";
import { ProductDto } from "./dtos/product-dto";
import { PaginateDto } from "src/api/common/dtos/paginate-sort-dto";
import { CategoryService } from "src/api/category/category.service";
export declare class ProductService {
    private prodModel;
    private catServ;
    constructor(prodModel: Model<ProductDocument>, catServ: CategoryService);
    create(productDto: ProductDto): Promise<Product>;
    update(productDto: ProductDto, id: string): Promise<Product>;
    findAll(paginateDto: PaginateDto): Promise<any>;
    findAllByCategory(category: any, paginateDto: PaginateDto): Promise<any>;
    findAllByCategorySlug(category: any, paginateDto: PaginateDto): Promise<any>;
    findOne(id: string): Promise<Product>;
    findOneBySlug(slug: string): Promise<Product>;
    deleteOne(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
