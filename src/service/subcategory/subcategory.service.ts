import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatesubCategoryDto } from 'src/dto/CreatesubCategory.dto';
import { UpdatesubCategoryDto } from 'src/dto/UpdatesubCategory.dto';
import { ISubCategory } from 'src/inteface/category.interface';
import { Model } from "mongoose";


@Injectable()
export class SubcategoryService {
    constructor(@InjectModel('SubCategory') private subcategoryModel: Model<ISubCategory>) { }

    async createsubCategory(createCategoryDto: CreatesubCategoryDto): Promise<ISubCategory> {
        const newCategory = await new this.subcategoryModel(createCategoryDto);
        return newCategory.save();
    }

    async updateCategory(categoryId: string, updateCategoryDto: UpdatesubCategoryDto): Promise<ISubCategory> {
        const existingCategory = await this.subcategoryModel.findByIdAndUpdate(categoryId, updateCategoryDto, { new: true });
        if (!existingCategory) {
            throw new NotFoundException(`Student #${categoryId} not found`);
        }
        return existingCategory;
    }

    async getCategories(): Promise<ISubCategory[]> {
        const categoryData = await this.subcategoryModel.find();
        if (!categoryData || categoryData.length == 0) {
            throw new NotFoundException('Categories data not found!');
        }
        return categoryData;
    }

    async getCategory(categoryId: string): Promise<ISubCategory> {
        const existingCategory = await this.subcategoryModel.findById(categoryId).exec();
        if (!existingCategory) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return existingCategory;
    }

    async deleteCategory(categoryId: string): Promise<ISubCategory> {
        const deletedCategory = await this.subcategoryModel.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return deletedCategory;
    }
}