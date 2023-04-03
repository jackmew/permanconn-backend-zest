import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { handleError } from "../utils/httpUtils";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        res.json(products);
    } catch (error) {
        handleError(res, error, 500)
    }
}
export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new ProductModel(req.body)
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        handleError(res, error, 400);
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        handleError(res, error, 400);
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findByIdAndRemove(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        handleError(res, error, 500);
    }
}
