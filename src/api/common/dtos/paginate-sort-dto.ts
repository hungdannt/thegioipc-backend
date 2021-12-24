import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  skip: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @Type(() => String)
  //   @IsString()
  sortBy: string;

  @Type(() => Number)
  //   @IsNumber()
  sortOrder: number;

  @Type(() => String)
  search: string;
}
