"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const paginate_sort_dto_1 = require("../common/dtos/paginate-sort-dto");
const category_service_1 = require("../category/category.service");
let ProductService = class ProductService {
    constructor(prodModel, catServ) {
        this.prodModel = prodModel;
        this.catServ = catServ;
    }
    async create(productDto) {
        const createdCat = new this.prodModel(productDto);
        return createdCat.save();
    }
    async update(productDto, id) {
        return this.prodModel
            .findByIdAndUpdate(id, Object.assign({}, productDto), { useFindAndModify: false })
            .exec();
    }
    async findAll(paginateDto) {
        if (paginateDto.search) {
            const data = await this.prodModel
                .find({ name: { $regex: paginateDto.search, $options: "i" } }, "name slug price image status ")
                .exec();
            const cresult = data.length;
            return { data, cresult };
        }
        if (!paginateDto.search) {
            const count = await this.prodModel.countDocuments().exec();
            const data = await this.prodModel
                .find()
                .skip(paginateDto.skip)
                .limit(paginateDto.limit)
                .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
                .populate("category")
                .exec();
            return { count, data };
        }
    }
    async findAllByCategory(category, paginateDto) {
        const count = await this.prodModel
            .countDocuments({ category })
            .exec();
        const docs = await this.prodModel
            .find({ category })
            .skip(paginateDto.skip)
            .limit(paginateDto.limit)
            .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
            .exec();
        return { count, docs };
    }
    async findAllByCategorySlug(category, paginateDto) {
        var arraySlug = [];
        arraySlug = category.split(",");
        var idArray = [];
        if (arraySlug.length > 1) {
            for (const i in arraySlug) {
                const cat = await this.catServ.findOneBySlug(arraySlug[i]);
                idArray.push(String(cat._id));
            }
        }
        else {
            const cat = await this.catServ.findOneBySlug(arraySlug[0]);
            idArray.push(String(cat._id));
        }
        const count = await this.prodModel
            .countDocuments({ category: { $all: idArray } })
            .exec();
        const data = await this.prodModel
            .find({ category: { $all: idArray } })
            .skip(paginateDto.skip)
            .limit(paginateDto.limit)
            .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
            .exec();
        return { count, data };
    }
    async findOne(id) {
        return this.prodModel.findById(id).exec();
    }
    async findOneBySlug(slug) {
        return this.prodModel.findOne({ slug }).exec();
    }
    async deleteOne(id) {
        return this.prodModel.deleteOne({ _id: id }).exec();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map