import express from 'express';
const productRoutes = express.Router();
import { index } from '../../controllers/productsController';

//product routes
productRoutes.get('/products', index);



export default productRoutes;