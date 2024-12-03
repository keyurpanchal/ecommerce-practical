import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';
import Product from '../models/product';
import CartItem from '../models/cart';

// Add an item to the cart
export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const price = product.price;
    const productName = product.name;

    const newCartItem = new CartItem({
      userId,
      productId,
      quantity,
      price,
      productName
    });

    const savedCartItem = await newCartItem.save();
    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: savedCartItem,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all cart items for the user
export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const cartItems = await CartItem.find({ userId }).populate('productId');
    res.status(200).json({
      success: true,
      message: 'Cart items retrieved successfully',
      data: cartItems,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update cart item
export const updateCartItem = async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user?.id;

  try {
    const cartItem = await CartItem.findOne({ productId: productId, userId });
    if (!cartItem) {
      res.status(404).json({ success: false, message: 'Cart item not found' });
      return;
    }

    cartItem.quantity = quantity;
    const updatedCartItem = await cartItem.save();

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: updatedCartItem,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete cart item
export const deleteCartItem = async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const userId = req.user?.id;

  try {
    const cartItem = await CartItem.findOneAndDelete({ productId: productId, userId });
    if (!cartItem) {
      res.status(404).json({ success: false, message: 'Cart item not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Cart item deleted successfully',
    });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete cart
export const deleteCart = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const cartItem = await CartItem.deleteMany({ userId });
    if (!cartItem) {
      res.status(404).json({ success: false, message: 'Cart item not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully',
    });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};