import { IsArray, IsDecimal, IsMongoId, IsNotEmpty } from "class-validator";

export class ProductDto {
  @IsNotEmpty()
  name: string;

  slug: string;

  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsArray()
  category: any;
}
