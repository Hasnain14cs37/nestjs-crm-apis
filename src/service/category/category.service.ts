import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from 'src/dto/CreateCategory.dto';
import { UpdateCategoryDto } from 'src/dto/UpdateCategory.dto';
import { ISubCategory } from 'src/inteface/subCategory.interface ';
import { Model } from "mongoose";


@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private categoryModel: Model<ISubCategory>) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ISubCategory> {
        const newCategory = await new this.categoryModel(createCategoryDto);
        return newCategory.save();
    }

    async updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<ISubCategory> {
        const existingCategory = await this.categoryModel.findByIdAndUpdate(categoryId, updateCategoryDto, { new: true });
        if (!existingCategory) {
            throw new NotFoundException(`Student #${categoryId} not found`);
        }
        return existingCategory;
    }

    async getCategories(): Promise<ISubCategory[]> {
        const categoryData = await this.categoryModel.find();
        if (!categoryData || categoryData.length == 0) {
            throw new NotFoundException('Categories data not found!');
        }
        return categoryData;
    }

    async getCategory(categoryId: string): Promise<ISubCategory> {
        const existingCategory = await this.categoryModel.findById(categoryId).exec();
        if (!existingCategory) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return existingCategory;
    }

    async deleteCategory(categoryId: string): Promise<ISubCategory> {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return deletedCategory;
    }
}