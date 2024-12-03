import express from 'express';
import { addToCart, deleteCart, deleteCartItem, getCart, updateCartItem } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, addToCart);

router.get('/', authenticate, getCart);

router.put('/:productId', authenticate, updateCartItem);

router.delete('/:productId', authenticate, deleteCartItem);

router.delete('/', authenticate, deleteCart);

export const cartRoutes = router;
