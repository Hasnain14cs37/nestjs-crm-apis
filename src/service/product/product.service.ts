import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from 'src/dto/CreateProduct.dto';
import { UpdateProductDto } from 'src/dto/UpdateProduct.dto';
import { Iproduct } from 'src/inteface/product.interface';
import { Model } from "mongoose";


@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private ProductModel: Model<Iproduct>) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Iproduct> {
        const newProduct = await new this.ProductModel(createProductDto);
        return newProduct.save();
    }

    async updateProduct(categoryId: string, updateProductDto: UpdateProductDto): Promise<Iproduct> {
        const existingProduct = await this.ProductModel.findByIdAndUpdate(categoryId, updateProductDto, { new: true });
        if (!existingProduct) {
            throw new NotFoundException(`Student #${categoryId} not found`);
        }
        return existingProduct;
    }

    async getProducts(): Promise<Iproduct[]> {
        const productData = await this.ProductModel.find();
        if (!productData || productData.length == 0) {
            throw new NotFoundException('Categories data not found!');
        }
        return productData;
    }

    async getProduct(productId: string): Promise<Iproduct> {
        const existingProduct = await this.ProductModel.findById(productId).exec();
        if (!existingProduct) {
            throw new NotFoundException(`Category #${productId} not found`);
        }
        return existingProduct;
    }

    async deleteProduct(categoryId: string): Promise<Iproduct> {
        const deleteProduct = await this.ProductModel.findByIdAndDelete(categoryId);
        if (!deleteProduct) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return deleteProduct;
    }
}