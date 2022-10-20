import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @MaxLength(390)
    @IsNotEmpty()
    readonly description: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly categoryId: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly subcategoryId: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly price: number;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly quantity: number;
}