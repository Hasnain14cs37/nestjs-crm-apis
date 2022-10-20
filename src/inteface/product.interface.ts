import { Document } from 'mongoose';

export interface Iproduct extends Document{
    readonly name: string;
    readonly description: string;
    readonly categoryId: string;
    readonly subcategoryId: string;
    readonly price: number;
    readonly quantity: number;

}