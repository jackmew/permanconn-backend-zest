import {Document, Schema, model} from 'mongoose';


export interface IProduct extends Document {
    title: string;
    description: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
}


const productSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: false },
        discountPercentage: { type: Number, required: false },
        rating: { type: Number, required: false },
        stock: { type: Number, required: false },
        brand: { type: String, required: false },
        category: { type: String, required: false },
        thumbnail: { type: String, required: false },
        images: { type: [String], required: false },
    }
);
productSchema.index({ title: 'text', description: 'text' });

export const ProductModel = model<IProduct>('Product', productSchema);

