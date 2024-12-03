import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { productRoutes } from './routes/product.routes';
import { authRoutes } from './routes/auth.routes';
import { orderRoutes } from './routes/order.routes';
import { connectDb } from './utils/dbConnector';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger-config';
import cors from 'cors';
import { cartRoutes } from './routes/cart.routes';

const app = express();
app.use(express.json());
app.use(cors());

connectDb(process.env.DB_CONNECT as string);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));