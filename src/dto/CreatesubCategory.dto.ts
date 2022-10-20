import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatesubCategoryDto {
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
}