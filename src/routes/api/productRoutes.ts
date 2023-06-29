import express from 'express';
const productRoutes = express.Router();
import { index, show, create } from '../../controllers/productsController';
import { verifyToken } from './../../utils/index';

//product routes
productRoutes.get('/products', index);
productRoutes.get('/products/:id', show);
productRoutes.post('/products', verifyToken, create);

export default productRoutes;
