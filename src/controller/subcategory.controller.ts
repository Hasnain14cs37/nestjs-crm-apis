import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put,Res } from '@nestjs/common';
import { response } from 'express';
import { CreatesubCategoryDto } from 'src/dto/CreatesubCategory.dto';
import { UpdatesubCategoryDto } from 'src/dto/UpdatesubCategory.dto';
// import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { SubcategoryService } from 'src/service/subcategory/subcategory.service';

@Controller('subCategories')
export class SubCategoryController {
    constructor(private readonly subcategoryService: SubcategoryService) { }

    @Post('create')
    async createsubCategory(@Res() response, @Body() createsubCategoryDto: CreatesubCategoryDto) {
        try {
            const newStudent = await this.subcategoryService.createsubCategory(createsubCategoryDto);
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
            const data = await this.subcategoryService.getCategories();
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
            const existingCategory =await this.subcategoryService.getCategory(categoryId);
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
    async updateCategory(@Res() response,@Param('id') categoryId:string, @Body() UpdateCategoryDto:UpdatesubCategoryDto)
    {
        try
        {
            const existingCategory = await this.subcategoryService.updateCategory(categoryId,UpdateCategoryDto);
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
            const deleteCategory=await this.subcategoryService.deleteCategory(categoryId);
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