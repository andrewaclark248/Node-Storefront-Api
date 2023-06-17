import express from 'express';
const orderRoutes = express.Router();
import { create, update } from '../../controllers/ordersController';
import { verifyToken } from './../../utils/index'

//order routes
orderRoutes.post('/order', verifyToken, create);
orderRoutes.put("/order/:id", verifyToken, update)


export default orderRoutes;