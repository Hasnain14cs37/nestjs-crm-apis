import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category.schema';
import { SubCategorySchema } from './schema/subcategory.schema';
import { ProductSchema } from './schema/product.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryService } from './service/category/category.service';
import { CategoryController } from './controller/category.controller';
import { SubcategoryService } from './service/subcategory/subcategory.service';
import { SubCategoryController } from './controller/subcategory.controller';
import { ProductService } from './service/product/product.service';
import { ProductController } from './controller/product.controller';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'crm'}),
    MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
    MongooseModule.forFeature([{name: 'SubCategory', schema: SubCategorySchema}]),
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
  ],
  controllers: [AppController,CategoryController, SubCategoryController,ProductController],
  providers: [AppService, CategoryService, SubcategoryService, ProductService],
})
export class AppModule {}
