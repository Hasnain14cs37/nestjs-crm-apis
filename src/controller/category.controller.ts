import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put,Res } from '@nestjs/common';
import { response } from 'express';
import { CreateCategoryDto } from 'src/dto/CreateCategory.dto';
import { UpdateCategoryDto } from 'src/dto/UpdateCategory.dto';
// import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { CategoryService } from 'src/service/category/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('create')
    async createCategory(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
        try {
            const newStudent = await this.categoryService.createCategory(createCategoryDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                newStudent,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }

    @Get('index')
    async getCategories(@Res() response){
        try {
            const data = await this.categoryService.getCategories();
            return response.status(HttpStatus.OK).json({
                message: 'All categories fetched successfully',
                data
            });
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Get('/:id')
    async getCategory(@Res() response, @Param('id') categoryId:string){
        try{
            const existingCategory =await this.categoryService.getCategory(categoryId);
            return response.status(HttpStatus.OK).json({
                message:'Category found sccessfully',
                existingCategory,
            });
        }
        catch(err){
            return response.status(err.status).json(err.response);
        }
    }
    @Put('/:id')
    async updateCategory(@Res() response,@Param('id') categoryId:string, @Body() UpdateCategoryDto:UpdateCategoryDto)
    {
        try
        {
            const existingCategory = await this.categoryService.updateCategory(categoryId,UpdateCategoryDto);
            return response.status(HttpStatus.OK).json(
                { 
                    message:'Category has been updated successfully. ',
                    existingCategory,               
            }
            );
        }catch(err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteCategory(@Res() response,@Param('id') categoryId:string)
    {
        try
        {
            const deleteCategory=await this.categoryService.deleteCategory(categoryId);
            return response.status(HttpStatus.OK).json({
                message:'Category deleted successfully',
                deleteCategory
            });

        }catch(err)
        {
            return response.status(err.status).json(err.response);
        }

    }
}