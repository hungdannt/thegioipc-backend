import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";
import { ProductDto } from "./dtos/product-dto";
import { PaginateDto } from "src/api/common/dtos/paginate-sort-dto";
import { CategoryService } from "src/api/category/category.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private prodModel: Model<ProductDocument>,
    private catServ: CategoryService
  ) {}

  async create(productDto: ProductDto): Promise<Product> {
    const createdCat = new this.prodModel(productDto);
    return createdCat.save();
  }

  async update(productDto: ProductDto, id: string): Promise<Product> {
    return this.prodModel
      .findByIdAndUpdate(id, { ...productDto }, { useFindAndModify: false })
      .exec();
  }

  async findAll(paginateDto: PaginateDto): Promise<any> {
    if (paginateDto.search) {
      const data = await this.prodModel
        .find(
          { name: { $regex: paginateDto.search, $options: "i" } },
          "name slug price image status "
        )
        .exec();
      const cresult = data.length;

      return { data, cresult };
    }

    if (!paginateDto.search) {
      const count: number = await this.prodModel.countDocuments().exec();
      const data: Product[] = await this.prodModel
        .find()
        .skip(paginateDto.skip)
        .limit(paginateDto.limit)
        .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
        .populate("category")
        .exec();
      return { count, data };
    }
  }

  async findAllByCategory(
    category: any,
    paginateDto: PaginateDto
  ): Promise<any> {
    const count: number = await this.prodModel
      .countDocuments({ category })
      .exec();
    const docs: Product[] = await this.prodModel
      .find({ category })
      .skip(paginateDto.skip)
      .limit(paginateDto.limit)
      .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
      .exec();
    return { count, docs };
  }

  async findAllByCategorySlug(
    category: any,
    paginateDto: PaginateDto
  ): Promise<any> {
    var arraySlug: Array<string> = [];
    arraySlug = category.split(",");
    var idArray: Array<string> = [];
    if (arraySlug.length > 1) {
      for (const i in arraySlug) {
        const cat: any = await this.catServ.findOneBySlug(arraySlug[i]);
        idArray.push(String(cat._id));
      }
    } else {
      const cat: any = await this.catServ.findOneBySlug(arraySlug[0]);
      idArray.push(String(cat._id));
    }

    const count: number = await this.prodModel
      .countDocuments({ category: { $all: idArray } })
      .exec();

    const data: Product[] = await this.prodModel
      //   .find({ category: cat._id }, { category: '61c3ee84eec01d36736726a0' })
      .find({ category: { $all: idArray } })
      .skip(paginateDto.skip)
      .limit(paginateDto.limit)
      .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
      .exec();
    return { count, data };
  }

  async findOne(id: string): Promise<Product> {
    return this.prodModel.findById(id).exec();
  }

  async findOneBySlug(slug: string): Promise<Product> {
    return this.prodModel.findOne({ slug }).exec();
  }

  async deleteOne(id: string) {
    return this.prodModel.deleteOne({ _id: id }).exec();
  }
}
