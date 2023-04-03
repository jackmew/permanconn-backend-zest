import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { handleError } from "../utils/httpUtils";

// export const getProducts = async (req: Request, res: Response) => {
//     try {
//         const products = await ProductModel.find({});
//         const count = await ProductModel.countDocuments();
//         const productsResponse = {
//             products,
//             total: count,
//             limit: 0,
//             skip: 0,
//         }
//         res.json(productsResponse);
//     } catch (error) {
//         handleError(res, error, 500)
//     }
// }
export const getProduct = async (req: Request, res: Response) => {
    console.log('getProduct', req.params.id);
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        handleError(res, error, 500);
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
    console.log('updateProduct', req.params.id)
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        console.log('product', product)
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
export const searchProducts = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q;
        console.log('searchQuery', searchQuery)
        const products = await ProductModel.find({
            $text: { $search: searchQuery as string },
        });
        const count = await ProductModel.countDocuments();
        const productsResponse = {
            products,
            total: count,
            limit: 0,
            skip: 0,
        }
        res.json(productsResponse);
    } catch (error) {
        handleError(res, error, 500);
    }
}
export const limitAndSkipProducts = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit;
        const skip = req.query.skip;
        const products = await ProductModel.find({})
            .sort({ _id: -1 })
            .skip(parseInt(skip as string))
            .limit(parseInt(limit as string));
        const count = await ProductModel.countDocuments();
        const productsResponse = {
            products,
            total: count,
            limit,
            skip,
        }
        res.json(productsResponse);
    } catch (error) {
        handleError(res, error, 500);
    }
}
