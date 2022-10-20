import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class SubCategory {
   @Prop()
   name: string;
   @Prop()
   description: string;
   @Prop()
   categoryId:string;
  
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);