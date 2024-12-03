import { Request, Response } from 'express';
import Product from '../models/product';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
    
        res.status(201).json({
          success: true,
          message: 'Product created successfully',
          data: product,
        });
        return;
      } catch (error:any) {
        res.status(500).json({
          success: false,
          message: 'Failed to create product',
          error: error.message,
        });
      }
};

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
        const filter: any = {};
        if (category) filter.category = category;
        if (minPrice || maxPrice)
          filter.price = { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity };
    
        const products = await Product.find(filter)
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit));
    
        res.status(200).json({
          success: true,
          message: 'Products retrieved successfully',
          data: products,
        });
        return;
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Failed to retrieve products',
          error: error.message,
        });
      }
};

export const getProductById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
    
        if (!product) {
          res.status(404).json({
            success: false,
            message: 'Product not found',
            error: 'No product found with the given ID',
          });
          return;
        }
    
        res.status(200).json({
          success: true,
          message: 'Product retrieved successfully',
          data: product,
        });
        return;
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Failed to retrieve product',
          error: error.message,
        });
      }
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
        if (!updatedProduct) {
          res.status(404).json({
            success: false,
            message: 'Product not found',
            error: 'No product found with the given ID',
          });
          return;
        }
    
        res.status(200).json({
          success: true,
          message: 'Product updated successfully',
          data: updatedProduct,
        });
        return;
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Failed to update product',
          error: error.message,
        });
      }
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
        if (!deletedProduct) {
          res.status(404).json({
            success: false,
            message: 'Product not found',
            error: 'No product found with the given ID',
          });
          return;
        }
    
        res.status(200).json({
          success: true,
          message: 'Product deleted successfully',
          data: deletedProduct,
        });
        return;
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Failed to delete product',
          error: error.message,
        });
      }
};