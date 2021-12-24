"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./api/user/user.module");
const auth_module_1 = require("./api/auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const category_module_1 = require("./api/category/category.module");
const product_module_1 = require("./api/product/product.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "uploads"),
                exclude: ["/api*"]
            }),
            mongoose_1.MongooseModule.forRoot("mongodb+srv://thegioipc:thegioipc@cluster0.bf399.mongodb.net/thegioipc?retryWrites=true&w=majority", {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                bufferMaxEntries: 0,
                bufferCommands: false
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map