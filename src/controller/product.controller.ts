import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put,Res } from '@nestjs/common';
import { response } from 'express';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { UpdatesubCategoryDto } from 'src/dto/UpdatesubCategory.dto';
import { ProductService } from 'src/service/product/product.service';
// import { UpdateStudentDto } from 'src/dto/update-student.dto';
// import { SubcategoryService } from 'src/service/subcategory/subcategory.service';

@Controller('Products')
export class ProductController {
    ProductService: any;
    constructor(private readonly productService: ProductService) { }

    @Post('create')
    async createProduct(@Res() response, @Body() createProductDto: CreateProductDto) {
        try {
            const newStudent = await this.productService.createProduct(createProductDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Product has been created successfully',
                newStudent,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not created!',
                error: 'Bad Request'
            });
        }
    }

    @Get('index')
    async getProducts(@Res() response){
        try {
            const data = await this.productService.getProducts();
            return response.status(HttpStatus.OK).json({
                message: 'All product fetched successfully',
                data
            });
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Get('/:id')
    async getProduct(@Res() response, @Param('id') productId:string){
        try{
            const existingProduct =await this.productService.getProduct(productId);
            return response.status(HttpStatus.OK).json({
                message:'Product found sccessfully',
                existingProduct,
            });
        }
        catch(err){
            return response.status(err.status).json(err.response);
        }
    }
    @Put('/:id')
    async updateProduct(@Res() response,@Param('id') productId:string, @Body() UpdateProductDto:UpdatesubCategoryDto)
    {
        try
        {
            const existingProduct = await this.productService.updateProduct(productId,UpdateProductDto);
            return response.status(HttpStatus.OK).json(
                { 
                    message:'Product has been updated successfully. ',
                    existingProduct,               
            }
            );
        }catch(err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteProduct(@Res() response,@Param('id') categoryId:string)
    {
        try
        {
            const deleteProduct=await this.ProductService.deleteProduct(categoryId);
            return response.status(HttpStatus.OK).json({
                message:'Product deleted successfully',
                deleteProduct
            });

        }catch(err)
        {
            return response.status(err.status).json(err.response);
        }

    }
}