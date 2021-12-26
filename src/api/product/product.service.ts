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
    if (paginateDto.category) {
      var category = paginateDto.category;
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
        .find({ category: { $all: idArray } })
        .skip(paginateDto.skip)
        .limit(paginateDto.limit)
        .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
        .populate("category")
        .exec();
      return { count, data };
    }
    if (paginateDto.search) {
      const data = await this.prodModel
        .find({ name: { $regex: paginateDto.search, $options: "i" } }, "name")
        .exec();

      const count = data.length;
      const temppages = Math.floor(count / paginateDto.limit);
      const url = `/products?limit=${paginateDto.limit}`;
      const pages =
        count / paginateDto.limit > temppages ? temppages + 1 : temppages;
      const cc = {
        total: count,
        currentPage: paginateDto.page == 1 ? 1 : paginateDto.page,
        lastPage: pages,
        // firstItem:  paginateDto.limit * paginateDto.page,
        // lastItem: Math.min((paginateDto.page - 1) * pages + paginateDto.limit, count - 1),
        perPage: paginateDto.limit,
        first_page_url: `${"http://localhost:3020"}${url}&page=1`,
        last_page_url: `${"http://localhost:3020"}${url}&page=${pages}`,
        next_page_url:
          pages > paginateDto.page
            ? `${"http://localhost:3020"}${url}&page=${
                Number(paginateDto.page) + 1
              }`
            : null,
        prev_page_url:
          pages >= paginateDto.page
            ? `${"http://localhost:3020"}${url}&page=${paginateDto.page - 1}`
            : null
      };
      if (paginateDto.page) {
        const data: Product[] = await this.prodModel
          .find(
            { name: { $regex: paginateDto.search, $options: "i" } },
            "name slug price image status gallery "
          )
          .skip(paginateDto.limit * (paginateDto.page - 1))
          .limit(paginateDto.limit)
          .populate("category")
          .exec();
        return { ...cc, data };
      }
    }

    if (!paginateDto.search) {
      const count: number = await this.prodModel.countDocuments().exec();
      const temppages = Math.floor(count / paginateDto.limit);
      const url = `/products?limit=${paginateDto.limit}`;
      const pages =
        count / paginateDto.limit > temppages ? temppages + 1 : temppages;
      const cc = {
        total: count,
        currentPage: paginateDto.page == 1 ? 1 : paginateDto.page,
        lastPage: pages,
        // firstItem:  paginateDto.limit * paginateDto.page,
        // lastItem: Math.min((paginateDto.page - 1) * pages + paginateDto.limit, count - 1),
        perPage: paginateDto.limit,
        first_page_url: `${"http://localhost:3020"}${url}&page=1`,
        last_page_url: `${"http://localhost:3020"}${url}&page=${pages}`,
        next_page_url:
          pages > paginateDto.page
            ? `${"http://localhost:3020"}${url}&page=${
                Number(paginateDto.page) + 1
              }`
            : null,
        prev_page_url:
          pages >= paginateDto.page
            ? `${"http://localhost:3020"}${url}&page=${paginateDto.page - 1}`
            : null
      };
      console.log(pages);
      if (paginateDto.page) {
        const data: Product[] = await this.prodModel
          .find()
          .skip(paginateDto.limit * (paginateDto.page - 1))
          .limit(paginateDto.limit)
          .populate("category")
          .exec();
        return { ...cc, data, count };
      }
      const data: Product[] = await this.prodModel
        .find()
        .skip(paginateDto.skip)
        .limit(paginateDto.limit)
        // .sort({ [paginateDto.sortBy]: paginateDto.sortOrder })
        // .populate("category")
        .exec();
      return { ...cc, data, count };
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
