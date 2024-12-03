import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Allows an admin to add a new product to the database. Requires authentication.
 *     tags: [Products]
 *     security:
 *       - customAuth: []
 *     requestBody:
 *       description: Product object with product details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Laptop"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 example: 1500.00
 *               description:
 *                 type: string
 *                 example: "Top-of-the-line laptop with fast processor and ample RAM."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Product added successfully.
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
 *                   example: "Product added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "product12345"
 *                     name:
 *                       type: string
 *                       example: "New Laptop"
 *       401:
 *         description: Unauthorized, invalid or missing token.
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
 *                   example: "Unauthorized access. Token is missing or invalid."
 *       403:
 *         description: Forbidden, user does not have permission.
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
 *                   example: "Permission denied. Admin access required."
 *       400:
 *         description: Bad request, validation error.
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
 *                   example: "Validation error"
 *                 error:
 *                   type: object
 */
router.post('/', authenticate, authorize('admin'), createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Fetch a list of products with optional filtering and pagination.
 *     tags: [Products]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: category
 *         in: query
 *         description: Filter products by category
 *         required: false
 *         schema:
 *           type: string
 *           example: "Electronics"
 *       - name: minPrice
 *         in: query
 *         description: Minimum price filter
 *         required: false
 *         schema:
 *           type: number
 *           example: 100
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price filter
 *         required: false
 *         schema:
 *           type: number
 *           example: 1000
 *     responses:
 *       200:
 *         description: A list of products with optional filters and pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "product12345"
 *                   name:
 *                     type: string
 *                     example: "Laptop"
 *                   category:
 *                     type: string
 *                     example: "Electronics"
 *                   price:
 *                     type: number
 *                     example: 1200.00
 *                   description:
 *                     type: string
 *                     example: "High performance laptop"
 *       400:
 *         description: Bad request, validation error.
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
 *                   example: "Invalid parameters"
 *                 error:
 *                   type: object
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product by its ID
 *     description: Get detailed information about a single product by its unique identifier.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: "product12345"
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "product12345"
 *                 name:
 *                   type: string
 *                   example: "Laptop"
 *                 category:
 *                   type: string
 *                   example: "Electronics"
 *                 price:
 *                   type: number
 *                   example: 1200.00
 *                 description:
 *                   type: string
 *                   example: "High performance laptop"
 *       404:
 *         description: Product not found.
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
 *                   example: "Product not found"
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by its ID
 *     description: Allows an admin to update product details using its unique identifier.
 *     tags: [Products]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *           example: "product12345"
 *     requestBody:
 *       description: Product object with the updated details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Laptop"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 example: 1100.00
 *               description:
 *                 type: string
 *                 example: "Updated high performance laptop"
 *     responses:
 *       200:
 *         description: Product updated successfully.
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
 *                   example: "Product updated"
 *       404:
 *         description: Product not found.
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
 *                   example: "Product not found"
 *       400:
 *         description: Bad request, validation error.
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
 *                   example: "Validation error"
 *                 error:
 *                   type: object
 */
router.put('/:id', authenticate, authorize('admin'), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     description: Allows an admin to delete a product using its unique identifier.
 *     tags: [Products]
 *     security:
 *       - customAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *           example: "product12345"
 *     responses:
 *       200:
 *         description: Product deleted successfully.
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
 *                   example: "Product deleted"
 *       404:
 *         description: Product not found.
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
 *                   example: "Product not found"
 */
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

export const productRoutes = router;