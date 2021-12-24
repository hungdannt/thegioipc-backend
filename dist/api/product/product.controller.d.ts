import { ProductService } from "./product.service";
import { ProductDto } from "./dtos/product-dto";
import { PaginateDto } from "src/api/common/dtos/paginate-sort-dto";
export declare class ProductController {
    private readonly catService;
    constructor(catService: ProductService);
    create(productDto: ProductDto): Promise<any>;
    findAll(paginateSortDto: PaginateDto): Promise<any>;
    findAllByCategory(category: string, paginateSortDto: PaginateDto): Promise<any>;
    findAllByCategorySlug(category: string, paginateSortDto: PaginateDto): Promise<any>;
    findOne(id: string): Promise<import("./schemas/product.schema").Product>;
    findOneBySlug(slug: string): Promise<import("./schemas/product.schema").Product>;
    update(id: string, updateCatDto: ProductDto): Promise<import("./schemas/product.schema").Product>;
    remove(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
