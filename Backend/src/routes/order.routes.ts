import express from 'express';
import { placeOrder, getOrders } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Routes for handling orders
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: This endpoint allows an authenticated user to create a new order.
 *     tags: [Orders]
 *     security:
 *       - customAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 63e12345678a1234567890ab
 *               quantity:
 *                 type: number
 *                 example: 2
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 63f12345678b1234567890cd
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid product ID or quantity
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.post('/', authenticate, placeOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     description: This endpoint allows an authenticated user to retrieve their orders.
 *     tags: [Orders]
 *     security:
 *       - customAuth: []
 *     responses:
 *       200:
 *         description: Orders successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Orders retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 63f12345678b1234567890cd
 *                       productId:
 *                         type: string
 *                         example: 63e12345678a1234567890ab
 *                       quantity:
 *                         type: number
 *                         example: 2
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.get('/', authenticate, getOrders);

export const orderRoutes = router;