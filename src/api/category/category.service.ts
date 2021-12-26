import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { CategoryDto } from "./dtos/category-dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private catModel: Model<CategoryDocument>
  ) {}

  async create(categoryDto: CategoryDto): Promise<Category> {
    const createdCat = new this.catModel(categoryDto);
    return createdCat.save();
  }

  async update(categoryDto: CategoryDto, id: string): Promise<Category> {
    return this.catModel
      .findByIdAndUpdate(id, { ...categoryDto }, { useFindAndModify: false })
      .exec();
  }

  async findAll(): Promise<any> {
    const data = await this.catModel.find().exec();
    const paginatorInfo = {};

    return { ...paginatorInfo, data };
  }

  async findChildrenBySlug(parent: any): Promise<any> {
    const data = await this.catModel.find({ parent: parent.parent }).exec();
    const paginatorInfo = {};

    return { ...paginatorInfo, data };
  }
  async findOne(id: string): Promise<Category> {
    return this.catModel.findById(id).exec();
  }

  async findOneBySlug(slug: string): Promise<Category> {
    return this.catModel.findOne({ slug }).exec();
  }

  async deleteOne(id: string) {
    return this.catModel.deleteOne({ _id: id }).exec();
  }
}
