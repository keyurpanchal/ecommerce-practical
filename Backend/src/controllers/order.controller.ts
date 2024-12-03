import { Request, Response } from 'express';
import Order from '../models/order';
import Product from '../models/product';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';

export const placeOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Ensure req.user is available (already handled by middleware)
    const { id: userId } = req.user;
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid order data',
        error: 'Items not available',
      });
      return;
    }

    // Create the order
    const order = new Order({ userId, items, totalAmount });
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { orderId: order._id },
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};

export const getOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: userId } = req.user;
    const orders = await Order.find({ userId });

    // Enrich each order with product details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = await Promise.all(
          order.items.map(async (item: any) => {
            const product = await Product.findById(item.productId);
            return {
              productId: item.productId,
              name: product?.name,
              category: product?.category,
              price: product?.price,
              imageUrl: product?.imageUrl,
              quantity: item.quantity,
              status: item.status,
            };
          })
        );
        return {
          _id: order._id,
          userId: order.userId,
          items: itemsWithDetails,
          status: order.status, 
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: enrichedOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};