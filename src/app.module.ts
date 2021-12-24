import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./api/user/user.module";
import { AuthModule } from "./api/auth/auth.module";
import { UploadModule } from "./upload/upload.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CategoryModule } from "./api/category/category.module";
import { ProductModule } from "./api/product/product.module";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      exclude: ["/api*"]
    }),
    MongooseModule.forRoot(
      "mongodb+srv://thegioipc:thegioipc@cluster0.bf399.mongodb.net/thegioipc?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        bufferMaxEntries: 0,
        bufferCommands: false
      }
    ),
    UserModule,
    AuthModule,
    UploadModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
